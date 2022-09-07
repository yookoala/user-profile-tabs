(function () {

    /**
     * Create a container node.
     *
     * @param {String} tagName
     * @param {String} className
     *
     * @returns
     */
    function createContainer(tagName = 'div', className = 'container') {
        const element = document.createElement(tagName);
        element.classList.add(className);
        return element;
    }

    /**
     * Create a tab link.
     *
     * @param {String} innerText
     * @param {HTMLElement} tabs
     * @param {HTMLElement} targetTab
     * @param {String} tagName
     * @param {String} className
     *
     * @returns
     */
     function createTabLink(innerText, tabs, targetTab, tagName = 'a', className = 'tab-link') {
        const wrapper = document.createElement('li');
        wrapper.className = `${className}-wrapper`;

        const link = document.createElement(tagName);
        link.innerText = innerText;
        link.href = '#';
        link.classList.add(className);
        link.addEventListener('click', function (event) {
            event.preventDefault();

            for (let siblingWrapper of event.target.parentNode.parentNode.children) {
                if (siblingWrapper.isEqualNode(wrapper)) {
                    siblingWrapper.querySelector('a').classList.add('active');
                    continue;
                }
                siblingWrapper.querySelector('a').classList.remove('active');
            }
            for (let siblingTab of tabs.children) {
                if (siblingTab.isEqualNode(targetTab)) {
                    siblingTab.classList.add('active');
                    continue;
                }
                siblingTab.classList.remove('active');
            }
        });
        wrapper.appendChild(link);
        return wrapper;
    }

    /**
     * Measure the height of an element.
     *
     * @param {HTMLElement} el
     * @returns
     */
    function getElementHeight(el) {
        var styles = window.getComputedStyle(el);
        var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);
        return Math.ceil(el.offsetHeight + margin);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const profileForm = document.querySelector('form#your-profile');
        if (typeof profileForm === 'undefined') {
            // do nothing if profile form is not here.
            return;
        }

        // Move all hidden input field to into form element (top level).
        // Then remove all paragraphs that has nothing after the migration.
        document.querySelectorAll('form#your-profile > p').forEach((el) => {
            el.querySelectorAll('input[type=hidden]').forEach((input) => {
                profileForm.prepend(input);
            });
            if (el.innerHTML.trim().length === 0) {
                el.remove();
            }
        });
    });

    window.addEventListener('load', function () {
        const profileForm = document.querySelector('form#your-profile');
        if (typeof profileForm === 'undefined') {
            // do nothing if profile form is not here.
            return;
        }

        const submit = profileForm.querySelector('p.submit')

        // The container to put tabs in
        const theContainer = profileForm;

        let container = createContainer();
        container.classList.add('user-profile-tabs');
        submit.before(container);
        let tabLinks = createContainer('ul', 'tab-links');
        container.appendChild(tabLinks);
        let tabs = createContainer('div', 'tabs');
        container.appendChild(tabs);

        let tab = null;
        let firstTab = true;
        for (let n of Array.from(theContainer.childNodes)) {
            // Prevent handling tabs or the submit button wrapper.
            if (n.isSameNode(container) || n.isSameNode(submit)) {
                continue;
            }

            // Skip handling empty text node.
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '') {
                continue;
            }

            // Find headings in node elements to create tab with.
            if (n.nodeType === Node.ELEMENT_NODE) {
                // Create tab for each h3
                if (n.tagName.toUpperCase() === 'H2' || n.tagName.toUpperCase() === 'H3') {
                    tab = createContainer('div', 'tab');
                    tabs.appendChild(tab);
                    tabLinks.appendChild(createTabLink(n.innerText, tabs, tab));
                } else if (n.querySelector('h2, h3') !== null) {
                    tab = createContainer('div', 'tab');
                    tabs.appendChild(tab);
                    tabLinks.appendChild(createTabLink(
                        n.querySelector('h2').innerText, tabs, tab
                    ));
                }
            }

            // If there is no tab, wait.
            if (tab === null) {
                continue;
            }

            // If the tab is the first tab, set it to active.
            if (firstTab) {
                tab.classList.add('active');
                tabLinks.querySelector('a').classList.add('active');
                firstTab = false;
            }

            // Move element inside container.
            tab.appendChild(n);
        }

        // Force the container to be at least the
        // height of the smallest tab.
        let maxTabHeight = 0;
        for (let tab of tabs.childNodes) {
            let tabHeight = getElementHeight(tab);
            maxTabHeight = (tabHeight > maxTabHeight)
                ? tabHeight : maxTabHeight;
        }
        tabs.style.minHeight = `${maxTabHeight}px`;
    });
})();
