package routes

import (
	"github.com/ankitkmrpate/worker-process-api/handlers"
	"github.com/gorilla/mux"
)

func RegisterRoutes() *mux.Router {
	r := mux.NewRouter()

	// File CRUD operations
	r.HandleFunc("/thread/{threadId}/files", handlers.CreateFile).Methods("POST")
	r.HandleFunc("/file/{fileId}", handlers.GetFile).Methods("GET")
	r.HandleFunc("/file/{fileId}", handlers.UpdateFile).Methods("PUT")
	r.HandleFunc("/file/{fileId}", handlers.DeleteFile).Methods("DELETE")
	r.HandleFunc("/thread/{threadId}/files", handlers.ListFiles).Methods("GET")

	return r
}
