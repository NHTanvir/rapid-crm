<?php
namespace RapidCRM\Traits;

defined( 'ABSPATH' ) || exit;

trait Asset {

	/**
	 * Registers a script with WordPress.
	 *
	 * @param string $handle    Script handle.
	 * @param string $src       Script source URL.
	 * @param array  $deps      Script dependencies.
	 * @param string $ver       Script version, defaults to the constant RapidCRM_VERSION.
	 * @param bool   $args      Optional arguments.
	 */
	public function register_script( $handle, $src, $deps = array(), $ver = null, $args = array() ) {

		if ( is_bool( $args ) ) {
			$args = array( 'in_footer' => $args );
		}

		wp_register_script( $handle, $src, $deps, $this->get_ver( $ver ), $args );
	}

	/**
	 * Enqueues a script in WordPress, registering it first if not already registered.
	 *
	 * @param string $handle    Script handle.
	 * @param string $src       Script source URL.
	 * @param array  $deps      Script dependencies.
	 * @param string $ver       Script version, defaults to the constant RapidCRM_VERSION.
	 * @param bool   $args      Whether to enqueue the script in the footer.
	 */
	public function enqueue_script( $handle, $src, $deps = array(), $ver = null, $args = array( 'in_footer' => true ) ) {
		if ( ! wp_script_is( $handle, 'registered' ) ) {
			$this->register_script( $handle, $src, $deps, $ver, $args );
		}

		wp_enqueue_script( $handle );
	}

	/**
	 * Localizes a script in WordPress.
	 *
	 * @param string $handle Script handle.
	 * @param string $object_name Name of the JavaScript object.
	 * @param array  $l10n        Data to localize.
	 */
	public function localize_script( $handle, $object_name, $l10n ) {
		wp_localize_script( $handle, $object_name, $l10n );
	}

	/**
	 * Registers a style with WordPress.
	 *
	 * @param string $handle Style handle.
	 * @param string $src    Style source URL.
	 * @param array  $deps   Style dependencies.
	 * @param string $ver    Style version, defaults to the constant RapidCRM_VERSION.
	 * @param string $media  Media for which this stylesheet has been defined.
	 */
	public function register_style( $handle, $src, $deps = array(), $ver = null, $media = 'all' ) {
		wp_register_style( $handle, $src, $deps, $this->get_ver( $ver ), $media );
	}

	/**
	 * Enqueues a style in WordPress, registering it first if not already registered.
	 *
	 * @param string $handle Style handle.
	 * @param string $src    Style source URL.
	 * @param array  $deps   Style dependencies.
	 * @param string $ver    Style version, defaults to the constant RapidCRM_VERSION.
	 * @param string $media  Media for which this stylesheet has been defined.
	 */
	public function enqueue_style( $handle, $src, $deps = array(), $ver = null, $media = 'all' ) {
		if ( ! wp_style_is( $handle, 'registered' ) ) {
			$this->register_style( $handle, $src, $deps, $ver, $media );
		}

		wp_enqueue_style( $handle );
	}

	/**
	 * Retrieves the correct version for enqueued assets.
	 *
	 * If WP_DEBUG is enabled, returns the current timestamp for cache busting.
	 * Otherwise, returns the specified version or the RapidCRM_VERSION constant if no version is provided.
	 *
	 * @param string|null $version Optional. The version number to return. Default is null.
	 *
	 * @return string The version number for the asset.
	 */
	private function get_ver( $version = null ) {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$version = date_i18n( 'U' );
		} elseif ( is_null( $version ) ) {
			$version = RapidCRM_VERSION;
		}

		return $version;
	}
}