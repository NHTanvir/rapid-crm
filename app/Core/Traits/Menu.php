<?php
namespace EasyCommerce\Traits;

defined( 'ABSPATH' ) || exit;

/**
 * Trait Menu
 *
 * This trait provides methods to add menu and submenu pages in the WordPress admin dashboard.
 *
 * @package EasyCommerce
 */
trait Menu {

	/**
	 * Add a menu page to the WordPress admin dashboard.
	 *
	 * @param string   $page_title The text to be displayed in the title tags of the page when the menu is selected.
	 * @param string   $menu_title The text to be used for the menu.
	 * @param string   $capability The capability required for this menu to be displayed to the user.
	 * @param string   $menu_slug  The slug name to refer to this menu by (should be unique for this menu).
	 * @param callable $callback   Optional. The function to be called to output the content for this page.
	 * @param string   $icon_url   Optional. The URL to the icon to be used for this menu.
	 * @param int      $position   Optional. The position in the menu order this item should appear.
	 */
	public function add_menu( $page_title, $menu_title, $capability, $menu_slug, $callback = '', $icon_url = '', $position = null ) {

		global $easycommerce_menus;

		if ( ! isset( $easycommerce_menus ) ) {
			$easycommerce_menus = [];
		}

		if ( ! isset( $easycommerce_menus[ $menu_slug ] ) ) {
			$easycommerce_menus[ $menu_slug ] = [];
		}

		add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $callback, $icon_url, $position );
	}

	/**
	 * Add a submenu page to a parent menu in the WordPress admin dashboard.
	 *
	 * @param string   $parent_slug The slug name for the parent menu (or the file name of a standard WordPress admin page).
	 * @param string   $page_title  The text to be displayed in the title tags of the page when the submenu is selected.
	 * @param string   $menu_title  The text to be used for the submenu.
	 * @param string   $capability  The capability required for this menu to be displayed to the user.
	 * @param string   $menu_slug   The slug name to refer to this submenu by (should be unique for this submenu).
	 * @param callable $callback    Optional. The function to be called to output the content for this page.
	 * @param int      $position    Optional. The position in the menu order this item should appear.
	 */
	public function add_submenu( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $callback = '', $position = null ) {

		global $easycommerce_menus;

		if ( ! isset( $easycommerce_menus ) ) {
			$easycommerce_menus = [];
		}

		if ( ! isset( $easycommerce_menus[ $parent_slug ] ) ) {
			$easycommerce_menus[ $parent_slug ] = [];
		}

		$easycommerce_menus[ $parent_slug ][] = [
			'menu_slug' 	=> $menu_slug,
			'menu_title' 	=> $menu_title
		];

		add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $callback, $position );
	}
}