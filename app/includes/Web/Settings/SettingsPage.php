<?php
namespace RapidCRM\Includes\Web\Settings;

defined('ABSPATH') || exit;

class SettingsPage {
	public function register() {
		add_action('admin_menu', [$this, 'add_menu']);
		add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
	}

	public function add_menu() {
		add_menu_page(
			__('RapidCRM Settings', 'rapidcrm'),
			'RapidCRM',
			'manage_options',
			'rapidcrm-settings',
			[$this, 'render'],
			'dashicons-admin-generic'
		);
	}

	public function enqueue_assets($hook) {
		if ($hook !== 'toplevel_page_rapidcrm-settings') return;

		wp_enqueue_script(
			'rapidcrm-admin-settings',
			plugins_url('/assets/js/admin-settings.js', \RAPIDCRM_FILE),
			[],
			filemtime(plugin_dir_path(\RAPIDCRM_FILE) . 'assets/js/admin-settings.js'),
			true
		);
	}

	public function render() {
		echo '<div class="wrap">';
		echo '<div id="rapid-crm-settings-root"></div>';
		echo '</div>';
	}
}
