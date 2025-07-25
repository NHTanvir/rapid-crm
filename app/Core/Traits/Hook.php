<?php
namespace RapidCRM\Traits;

defined( 'ABSPATH' ) || exit;

trait Hook {

	/**
	 * Registers an action hook.
	 *
	 * @param string   $tag The name of the action.
	 * @param callable $callback The callback function.
	 * @param int      $priority The order of execution. Default is 10.
	 * @param int      $accepted_args The number of accepted arguments. Default is 1.
	 */
	public function add_action( $tag, $callback, $priority = 10, $accepted_args = 1 ) {
		if ( is_callable( $callback ) ) {
			add_action( $tag, $callback, $priority, $accepted_args );
		}
	}

	/**
	 * Convenience wrapper for add_action.
	 */
	public function action( $tag, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->add_action( $tag, $callback, $priority, $accepted_args );
	}

	/**
	 * Registers a filter hook.
	 *
	 * @param string   $tag The name of the filter.
	 * @param callable $callback The callback function.
	 * @param int      $priority The order of execution. Default is 10.
	 * @param int      $accepted_args The number of accepted arguments. Default is 1.
	 */
	public function add_filter( $tag, $callback, $priority = 10, $accepted_args = 1 ) {
		if ( is_callable( $callback ) ) {
			add_filter( $tag, $callback, $priority, $accepted_args );
		}
	}

	/**
	 * Convenience wrapper for add_filter.
	 */
	public function filter( $tag, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->add_filter( $tag, $callback, $priority, $accepted_args );
	}

	/**
	 * Registers a shortcode.
	 *
	 * @param string   $tag The shortcode tag.
	 * @param callable $callback The callback function.
	 */
	public function add_shortcode( $tag, $callback ) {
		if ( is_callable( $callback ) ) {
			add_shortcode( $tag, $callback );
		}
	}

	/**
	 * Convenience wrapper for add_shortcode.
	 */
	public function shortcode( $tag, $callback ) {
		$this->add_shortcode( $tag, $callback );
	}

	/**
	 * Registers an AJAX action for logged-in users.
	 *
	 * @param string   $action The AJAX action.
	 * @param callable $callback The callback function.
	 */
	public function ajax_priv( $action, $callback ) {
		if ( is_callable( $callback ) ) {
			add_action( 'wp_ajax_' . $action, $callback );
		}
	}

	/**
	 * Registers an AJAX action for non-logged-in users.
	 *
	 * @param string   $action The AJAX action.
	 * @param callable $callback The callback function.
	 */
	public function ajax_nopriv( $action, $callback ) {
		if ( is_callable( $callback ) ) {
			add_action( 'wp_ajax_nopriv_' . $action, $callback );
		}
	}

	/**
	 * Registers both logged-in and non-logged-in AJAX actions.
	 */
	public function ajax( $action, $callback ) {
		if ( is_callable( $callback ) ) {
			$this->ajax_priv( $action, $callback );
			$this->ajax_nopriv( $action, $callback );
		}
	}
}