<?php
namespace RapidCRM\Database;

class Database {
    public function __construct() {
        global $wpdb;
        $this->db       = $wpdb;
        $this->prefix   = $wpdb->prefix . 'rapid_crm_';
    }

    public function init() {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $charset_collate = $this->db->get_charset_collate();

        $tables = [
            'users' => "
                CREATE TABLE {$this->prefix}users (
                    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password_hash VARCHAR(255) NOT NULL,
                    name VARCHAR(100),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                ) $charset_collate;
            ",
            'contacts' => "
                CREATE TABLE {$this->prefix}contacts (
                    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(255),
                    phone VARCHAR(50),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                ) $charset_collate;
            "
        ];

        foreach ( $tables as $name => $sql ) {
            $table_name = $this->db->prefix . $this->prefix . $name;

            if( $this->db->get_var("SHOW TABLES LIKE '{$table_name}'") !== $table_name ) {
                dbDelta($sql);
            }
        }
        
    }
}

