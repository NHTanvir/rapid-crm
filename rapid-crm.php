<?php
/**
 * Plugin Name: Rapid CRM
 * Description: Rapid CRM 
 * Plugin URI: https://naymul.com
 * Author: NH Tanvir
 * Author URI: https://naymul.com
 * Version: 0.1
 * Text Domain: rapid-crm
 */

namespace RapidCRM;

defined( 'ABSPATH' ) || exit;

define( 'RAPIDCRM_FILE', __FILE__ );
define( 'RAPIDCRM_VERSION', '0.1' );
define( 'RAPIDCRM_PLUGIN_DIR', plugin_dir_path( RAPIDCRM_FILE ) );
define( 'RAPIDCRM_PLUGIN_URL', plugin_dir_url( RAPIDCRM_FILE ) );
define( 'RAPIDCRM_ASSETS_URL', RAPIDCRM_PLUGIN_URL . 'assets/' );
define( 'RAPIDCRM_SPA_URL', RAPIDCRM_PLUGIN_URL . 'spa/' );

require_once 'vendor/autoload.php';

add_action('plugins_loaded', function () {
	Core\Initializer::init();
});
