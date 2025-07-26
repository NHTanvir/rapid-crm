<?php
namespace RapidCRM\Admin;

use RapidCRM\Traits\Hook;

defined( 'ABSPATH' ) || exit;

class Settings {
    use Hook;

    public function register() {
        $this->action( 'admin_menu', [ $this, 'add_menu' ] );
        $this->action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
    }

    public function add_menu() {
        $menus = rapidcrm_menus(); 

        foreach ( $menus as $menu ) {
            add_menu_page(
                $menu['title'],
                $menu['menu_title'],
                $menu['capability'],
                $menu['slug'],
                $menu['callback'] ?? [ $this, 'render' ],
                'dashicons-chart-bar',
                26
            );

            if ( ! empty( $menu['submenus'] ) ) {
                foreach ( $menu['submenus'] as $submenu ) {
                    add_submenu_page(
                        $menu['slug'],
                        $submenu['page_title'],
                        $submenu['menu_title'],
                        $menu['capability'],
                        $submenu['slug'],
                        $submenu['callback'] ?? [ $this, 'render' ]
                    );
                }
            }
        }
    }


    public function enqueue_assets( $hook ) {
        wp_enqueue_script(
            'rapidcrm-admin-settings',
            RAPIDCRM_PLUGIN_URL . 'build/rapidcrm.bundle.js',
            [],
            '1.0.0',
            true
        );
    }

    public function render() {
        echo '<div class="wrap">';
        echo '<div id="rapid-crm-root"></div>';
        echo '</div>';
    }
}
