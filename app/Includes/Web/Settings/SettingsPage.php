<?php
namespace RapidCRM\Includes\Web\Settings;

defined('ABSPATH') || exit;

class SettingsPage {
	public function register() {
		add_action('admin_menu', [$this, 'add_menu'] );
		add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
	}

	public function add_menu() {
		$menus = rapidcrm_menus();

		foreach ( $menus as $menu ) {
			add_menu_page(
				$menu['title'],
				$menu['menu_title'],
				$menu['capability'],
				$menu['slug'],
				$menu['callback'] ?? '',
				'dashicons-chart-bar',
				26
			);

			if ( !empty( $menu['submenus'] ) ) {
				foreach ( $menu['submenus'] as $submenu ) {
					add_submenu_page(
						$menu['slug'],        
						$submenu['page_title'],   
						$submenu['menu_title'],  
						$menu['capability'],   
						$submenu['slug'],
						$menu['callback'] ?? ''       
					);
				}
			}
		}
	}

	public function enqueue_assets($hook) {
		if ($hook !== 'toplevel_page_rapidcrm-settings') return;

		wp_enqueue_script(
			'rapidcrm-admin-settings',
			RAPIDCRM_PLUGIN_URL . 'build/rapidcrm.bundle.js',
			[],
			time(),
			true
		  );
		  
	}

	public function render() {
		echo '<div class="wrap">';
		echo '<div id="rapid-crm-settings-root"></div>';
		echo '</div>';
	}
}
