<?php

/**
 * Returns the home URL of the WordPress site.
 *
 * @param string $path    Optional. Path relative to the home URL.
 * @param int    $blog_id Optional. ID of the blog in a multisite installation.
 *
 * @return string Home URL with optional path appended.
 */
function rapidcrm_home_url( $path = '', $blog_id = null ) {
	return get_home_url( $blog_id, $path );
}

function rapidcrm_rest_base() {
	return rest_url( '/rapidcrm/v1' );
}
function rapidcrm_menus() {
    	return apply_filters( 'rapidcrm_menus', [
		[
			'title' 		=> __( 'RapidCRM', 'rapid-crm' ),
			'menu_title' 	=> __( 'RapidCRM', 'rapid-crm' ),
			'capability' 	=> 'manage_options',
			'slug' 			=> 'rapid-crm',
			'callback'		=> function() {
				printf(
					'
						<div id="rapid-crm-root">%1$s</div>
					',
					esc_html__( 'Loading..', 'rapid-crm' )
				);
			},
			'submenus' => [
				[
					'page_title' 	=> __( 'Dashboard', 'rapid-crm' ),
					'menu_title' 	=> __( 'Dashboard', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm',
				],
				[
					'page_title' 	=> __( 'Contacts', 'rapid-crm' ),
					'menu_title' 	=> __( 'Contacts', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm#/contacts',
				],
				[
					'page_title' 	=> __( 'Lists', 'rapid-crm' ),
					'menu_title' 	=> __( 'Lists', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm#/lists'
				],
				[
					'page_title' 	=> __( 'Tags', 'rapid-crm' ),
					'menu_title' 	=> __( 'Tags', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm#/tags'
				],
				[
					'page_title' 	=> __( 'Settings', 'rapid-crm' ),
					'menu_title' 	=> __( 'Settings', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm#/settings'
				],
			]
		]
	] );
}