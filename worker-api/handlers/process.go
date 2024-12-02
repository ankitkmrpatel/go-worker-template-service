package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type SSEMessage struct {
	Type    string      `json:"type"`
	Message string      `json:"message,omitempty"`
	Result  interface{} `json:"result,omitempty"`
}

func processFile(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	// Example progress updates
	for i := 1; i <= 5; i++ {
		msg := SSEMessage{
			Type:    "progress",
			Message: fmt.Sprintf("Step %d/5 completed", i),
		}
		json.NewEncoder(w).Encode(msg)
		flusher.Flush()
		time.Sleep(1 * time.Second)
	}

	// Example final result
	result := SSEMessage{
		Type: "result",
		Result: map[string]interface{}{
			"type":           "excel", // or "xml"
			"worksheetNames": []string{"Sheet1", "Sheet2"},
			"headers":        []string{"Name", "Age", "Email"},
			"rows": [][]string{
				{"Alice", "30", "alice@example.com"},
				{"Bob", "25", "bob@example.com"},
			},
		},
	}
	json.NewEncoder(w).Encode(result)
	flusher.Flush()
}

func main() {
	http.HandleFunc("/files/process", processFile)
	http.ListenAndServe(":8080", nil)
}
