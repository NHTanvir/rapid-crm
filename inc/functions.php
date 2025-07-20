<?php
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
					'page_title' 	=> __( 'tags', 'rapid-crm' ),
					'menu_title' 	=> __( 'tags', 'rapid-crm' ),
					'slug' 			=> 'rapid-crm#/tags'
				],
			]
		]
	] );
}