<?php

/**
 * Plugin Name: User Meta Tabs
 * Description: Group user meta fields under tabs
 * Version: 0.1
 * Author: Koala Yeung
 * Author URI: https://github.com/yookoala
 */

function user_meta_tabs_enqueue_script(string $hook)
{
    if (!in_array($hook, ['profile.php', 'user-edit.php'])) {
        return;
    }
    wp_enqueue_script('user_meta_tabs/profile', plugin_dir_url( __FILE__ ) . '/js/user-meta-tabs.js');
    wp_enqueue_style('user_meta_tabs/profile', plugin_dir_url( __FILE__ ) . '/css/user-meta-tabs.css');
}
add_action('admin_enqueue_scripts', 'user_meta_tabs_enqueue_script');