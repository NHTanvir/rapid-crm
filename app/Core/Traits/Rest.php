<?php
namespace RapidCRM\Traits;

defined( 'ABSPATH' ) || exit;

/**
 * Trait Rest
 *
 * This trait provides methods to register REST API routes and handle JSON responses in the WordPress plugin.
 *
 * @package RapidCRM
 */
trait Rest {

	// Namespace for the REST API routes specific to this plugin.
	public $namespace = 'rapidcrm/v1';

	/**
	 * Registers a new REST API route.
	 *
	 * @param string $path The route path.
	 * @param array  $args The route arguments.
	 */
	public function register_route( $path, $args ) {

		// If a permission callback is specified in the arguments, set it correctly.
		if ( isset( $args['permission'] ) ) {
			$args['permission_callback'] = $args['permission'];
			unset( $args['permission'] );
		}

		// Register the route with the specified namespace, path, and arguments.
		register_rest_route( $this->namespace, $path, $args );
	}

	/**
	 * Sends a JSON response success message.
	 *
	 * @param mixed $data The data to encode as JSON and send.
	 * @param int   $status_code HTTP status code to send with the response. Default is 200.
	 */
	public function response_success( $data = null, $status_code = 200 ) {
		status_header( $status_code );
		wp_send_json_success( $data );
	}

	/**
	 * Sends a JSON response error message.
	 *
	 * @param mixed $data The data to encode as JSON and send.
	 * @param int   $status_code HTTP status code to send with the response. Default is 400.
	 */
	public function response_error( $data = null, $status_code = 400 ) {
		status_header( $status_code );
		wp_send_json_error( $data );
	}

	/**
	 * Sends a JSON response with arbitrary data.
	 *
	 * @param mixed $data The data to encode as JSON and send.
	 * @param int   $status_code HTTP status code to send with the response. Default is 200.
	 */
	public function response( $data, $status_code = 200 ) {
		status_header( $status_code );
		wp_send_json( $data );
	}
}