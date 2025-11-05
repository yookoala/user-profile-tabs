=== User Profile Tabs ===
Contributors: yookoala
Donate link: https://www.buymeacoffee.com/yookoala
Tags: user profile, user fields, memberships, user meta, user profile
Tested up to: [WP_TESTED_UP_TO]
Stable tag: [WP_STABLE_TAG]
License: MIT
License URI: https://mit-license.org/

Regroup DOM element in profile form into tabs for better UX.


== Description ==

If your User Profile page is way too stuffed with fields (e.g. from Paid Membership Pro), this plugin will inject CSS and Javascripts to re-organize sections in "Account Management" sections into tabs. All fields under H3 will be re-organized in tabs.


== Screenshots ==

1. Install, activate, and then the User Profile page is no longer messy.
2. The "Name" section of default WordPress user profile page becomes a tab.
3. The "Contact Info" section of default WordPress user profile page becomes a tab.


== Frequently Asked Questions ==

= How do I use this plugin? =

Just install and activate. No other setup is needed.

Go to "Users > Profile" (`/wp-admin/profile.php` of your WordPress) and you will see the result.

= I have many other plugin that add things to the user profile page. Does this still work for me? =

Most probably, yes.

This plugin uses Javascript to parse and manipulate the page's DOM. From my observation, all contents from plugin are simply putting new `<h2>` or `<h3>` heading and then added their own content. This plugin plays nice with that convention in mind.

There are always exception. In that case, deactivating is very simple. This plugin leaves absolutely no footprint behind.

= Does this modify the profile page template or rendering process? =

No. All changes are on the browser only. And the changes are just moving things around into the tabs.

The underlying HTML of the page is never touched.

= How do I contribute? =

The development is happening on GitHub.

* [Source Code](https://github.com/yookoala/user-profile-tabs)
* [Issue Tracker](https://github.com/yookoala/user-profile-tabs/issues)
* [Pull Request](https://github.com/yookoala/user-profile-tabs/pulls)

= This easily solves my problem! How do I thank you for this? =

Well, some nice comment would be nice.

Also, you may consider to [buy me a pizza](https://www.buymeacoffee.com/yookoala).