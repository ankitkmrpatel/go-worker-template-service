package main

import (
	"log"
	"net/http"

	"github.com/ankitkmrpate/worker-process-api/db"
	"github.com/ankitkmrpate/worker-process-api/routes"
)

func main() {
	// Initialize database
	db.InitDatabase()

	// Initialize routes
	router := routes.RegisterRoutes()

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
