package db

import (
	"database/sql"
	"log"
	"os"

	_ "modernc.org/sqlite" // SQLite driver
)

var DB *sql.DB

func InitDatabase() {
	// Define the SQLite database file
	dbFile := "./file_processing.db"

	// Check if the database file exists
	if _, err := os.Stat(dbFile); os.IsNotExist(err) {
		log.Println("Database file not found, creating new SQLite database.")
	}

	// Open SQLite connection
	conn, err := sql.Open("sqlite", dbFile)
	if err != nil {
		log.Fatalf("Failed to connect to the SQLite database: %v", err)
	}

	// Ping the database to ensure connectivity
	if err := conn.Ping(); err != nil {
		log.Fatalf("SQLite database is not reachable: %v", err)
	}
	conn.Exec("PRAGMA foreign_keys = ON;")

	// Automatically run migrations if the file is new
	createTables(conn)

	// Store the connection in a global variable
	DB = conn
	log.Println("SQLite database connection successfully initialized")
}

func createTables(conn *sql.DB) {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS workers (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			description TEXT
		);`,
		`CREATE TABLE IF NOT EXISTS threads (
			id TEXT PRIMARY KEY,
			worker_id TEXT REFERENCES workers (id),
			name TEXT NOT NULL,
			file_type TEXT NOT NULL
		);`,
		`CREATE TABLE IF NOT EXISTS files (
			id TEXT PRIMARY KEY,
			thread_id TEXT REFERENCES threads (id),
			name TEXT NOT NULL,
			size BIGINT NOT NULL,
			content BLOB NOT NULL
		);`,
	}

	for _, q := range queries {
		if _, err := conn.Exec(q); err != nil {
			log.Fatalf("Failed to execute migration query: %v", err)
		}
	}
	log.Println("Migrations applied successfully.")
}
