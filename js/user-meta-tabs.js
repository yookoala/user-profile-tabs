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

    document.addEventListener('DOMContentLoaded', function () {
        const profileForm = document.querySelector('form#your-profile');
        if (typeof profileForm === 'undefined') {
            // do nothing if profile form is not here.
            return;
        }

        const accountManagementTitle = document.evaluate(
            '//h2[text()="Account Management"]',
            profileForm,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        if (accountManagementTitle === null) {
            // do nothing if the "<h2>Account Management</h2>" element is not here
            return;
        }

        // The container to put tabs in
        const theContainer = accountManagementTitle.parentElement;

        let container = createContainer();
        container.classList.add('user-meta-tabs');
        accountManagementTitle.after(container);
        let tabLinks = createContainer('ul', 'tab-links');
        container.appendChild(tabLinks);
        let tabs = createContainer('div', 'tabs');
        container.appendChild(tabs);

        let tab = createContainer('div', 'tab');
        tab.classList.add('active');
        tabs.appendChild(tab);

        let firstTab = createTabLink('Basics', tabs, tab);
        tabLinks.appendChild(firstTab);
        firstTab.querySelector('a').classList.add('active');

        let collect = false;
        for (let n of theContainer.childNodes) {
            if (n.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (n.isEqualNode(accountManagementTitle)) {
                collect = true;
                continue;
            } else if (n.isEqualNode(container)) {
                continue;
            } else if (!collect) {
                continue;
            }

            if (n.tagName.toUpperCase() === 'H2') {
                collect = false;
                continue;
            }

            // Create tab for each h3
            if (n.tagName.toUpperCase() === 'H3') {
                console.log('h3');
                tab = createContainer('div', 'tab');
                tabs.appendChild(tab);
                tabLinks.appendChild(createTabLink(n.innerText, tabs, tab));
            }

            // Move element inside container.
            tab.appendChild(n);
        }
    });
})();