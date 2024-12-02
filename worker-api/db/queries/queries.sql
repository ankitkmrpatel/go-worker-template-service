-- name: AddFile :one
INSERT INTO files (id, thread_id, name, size, content)
VALUES (:id, :thread_id, :name, :size, :content)
RETURNING *;

-- name: GetFileByID :one
SELECT * FROM files WHERE id = :id;

-- name: ListFilesByThread :many
SELECT * FROM files WHERE thread_id = :thread_id;

-- name: UpdateFileName :one
UPDATE files
SET name = :name
WHERE id = :id
RETURNING *;

-- name: DeleteFile :one
DELETE FROM files WHERE id = :id
RETURNING id;