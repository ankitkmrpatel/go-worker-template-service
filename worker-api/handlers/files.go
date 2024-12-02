package handlers

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"github.com/ankitkmrpate/worker-process-api/db"
	"github.com/ankitkmrpate/worker-process-api/db/sqlc"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func CreateFile(w http.ResponseWriter, r *http.Request) {
	threadID := mux.Vars(r)["threadId"]
	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Invalid file upload", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Read file content
	fileBytes, err := io.ReadAll(file) // Updated to use io.ReadAll
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	query := sqlc.New(db.DB)
	fileID := "file-" + generateUUID()

	nullThreadID := sql.NullString{
		String: threadID,
		Valid:  threadID != "", // set Valid to true if the string is not empty
	}

	fileData := sqlc.AddFileParams{
		ID:       fileID,
		ThreadID: nullThreadID,
		Name:     fileHeader.Filename,
		Size:     int64(len(fileBytes)),
		Content:  fileBytes,
	}
	createdFile, err := query.AddFile(r.Context(), fileData)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(createdFile)
}

func GetFile(w http.ResponseWriter, r *http.Request) {
	fileID := mux.Vars(r)["fileId"]
	query := sqlc.New(db.DB)

	file, err := query.GetFileByID(r.Context(), fileID)
	if err != nil {
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", "attachment; filename="+file.Name)
	_, err = w.Write(file.Content)
	if err != nil {
		http.Error(w, "Failed to send file", http.StatusInternalServerError)
	}
}

func UpdateFile(w http.ResponseWriter, r *http.Request) {
	fileID := mux.Vars(r)["fileId"]
	newName := r.FormValue("name")

	query := sqlc.New(db.DB)
	updatedFile, err := query.UpdateFileName(r.Context(), sqlc.UpdateFileNameParams{
		ID:   fileID,
		Name: newName,
	})
	if err != nil {
		http.Error(w, "Failed to update file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedFile)
}

func DeleteFile(w http.ResponseWriter, r *http.Request) {
	fileID := mux.Vars(r)["fileId"]
	query := sqlc.New(db.DB)

	_, err := query.DeleteFile(r.Context(), fileID)
	if err != nil {
		http.Error(w, "Failed to delete file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"deleted_id": fileID})
}

func ListFiles(w http.ResponseWriter, r *http.Request) {
	threadID := mux.Vars(r)["threadId"]
	query := sqlc.New(db.DB)

	nullThreadID := sql.NullString{
		String: threadID,
		Valid:  threadID != "", // set Valid to true if the string is not empty
	}

	files, err := query.ListFilesByThread(r.Context(), nullThreadID)
	if err != nil {
		http.Error(w, "Failed to list files", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(files)
}

// GenerateUUID generates a new UUID.
func generateUUID() string {
	return uuid.New().String()
}
