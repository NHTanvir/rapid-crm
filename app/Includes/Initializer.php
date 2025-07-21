<?php
namespace RapidCRM\Includes;

use RapidCRM\Admin\Settings;
use RapidCRM\Database\Database;

defined('ABSPATH') || exit;

class Initializer {
    public static function init() {
        $admin = new Settings();
        $admin->register();
        
        $database = new Database();
        $database->init();
    }
}
