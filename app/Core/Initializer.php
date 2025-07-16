<?php
namespace RapidCRM\Core;

use RapidCRM\Includes\Web\Settings\SettingsPage;
use RapidCRM\Database\Database;

defined('ABSPATH') || exit;

class Initializer {
    public static function init() {
        $page = new SettingsPage();
        $page->register();
        
        $database = new Database();
        $database->init();
    }
}
