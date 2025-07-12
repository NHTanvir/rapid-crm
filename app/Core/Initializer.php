<?php
namespace RapidCRM\Core;

use RapidCRM\Includes\Web\Settings\SettingsPage;

defined('ABSPATH') || exit;

class Initializer {
	public static function init() {
        $page = new SettingsPage();
        $page->register();
	}
}
