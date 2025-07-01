<?php

namespace RapidCRM\core;

class AdminMenu {
    public static function register() {
        add_action('admin_menu', [self::class, 'addMenu']);
    }

    public static function addMenu() {
        add_menu_page(
            'Rapid CRM',
            'Rapid CRM',
            'manage_options',
            'rapid-crm',
            [self::class, 'render'],
            'dashicons-groups',
            25
        );
    }

    public static function render() {
        echo '<div id="rapid-crm-root"></div>';
        self::enqueueAssets();
    }

    private static function enqueueAssets() {
        $base = plugin_dir_url(__DIR__ . '/../../');
        $js = glob(plugin_dir_path(__DIR__ . '/../../') . 'spa/build/static/js/main.*.js');
        $css = glob(plugin_dir_path(__DIR__ . '/../../') . 'spa/build/static/css/main.*.css');

        if (!empty($js)) {
            echo '<script src="' . $base . 'spa/build/static/js/' . basename($js[0]) . '"></script>';
        }

        if (!empty($css)) {
            echo '<link rel="stylesheet" href="' . $base . 'spa/build/static/css/' . basename($css[0]) . '">';
        }
    }
}
