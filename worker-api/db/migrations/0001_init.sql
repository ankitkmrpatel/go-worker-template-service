CREATE TABLE workers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE threads (
    id TEXT PRIMARY KEY,
    worker_id TEXT REFERENCES workers (id),
    name TEXT NOT NULL,
    file_type TEXT NOT NULL
);

CREATE TABLE files (
    id TEXT PRIMARY KEY,
    thread_id TEXT REFERENCES threads (id),
    name TEXT NOT NULL,
    size BIGINT NOT NULL,
    content BLOB NOT NULL
);
