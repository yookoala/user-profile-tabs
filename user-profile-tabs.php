<?php

/**
 * Plugin Name: User Profile Tabs
 * Description: Group user profile page fields under tabs.
 * Version: 1.0
 * Author: Koala Yeung
 * Author URI: https://github.com/yookoala
 */

function user_profile_tabs_enqueue_script(string $hook)
{
    if (!in_array($hook, ['profile.php', 'user-edit.php'])) {
        return;
    }
    wp_enqueue_script('user_profile_tabs/profile', plugin_dir_url( __FILE__ ) . '/js/user-profile-tabs.js');
    wp_enqueue_style('user_profile_tabs/profile', plugin_dir_url( __FILE__ ) . '/css/user-profile-tabs.css');
}
add_action('admin_enqueue_scripts', 'user_profile_tabs_enqueue_script');
