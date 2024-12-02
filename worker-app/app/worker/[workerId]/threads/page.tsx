"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createThread, listThreads, deleteThread } from "@/lib/api";

type ThreadType = {
  id: string;
  name: string;
};

const ThreadPage = () => {
  const router = useRouter();
  const { workerId } = router.query;
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [threadName, setThreadName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (workerId) {
      // Fetch threads when page loads
      const fetchThreads = async () => {
        try {
          const threads = await listThreads(workerId as string);
          setThreads(threads);
        } catch (error) {
          console.log(error);

          setError("Failed to fetch threads");
        }
      };
      fetchThreads();
    }
  }, [workerId]);

  const handleCreateThread = async () => {
    if (!workerId) return;

    try {
      const newThread = await createThread({
        workerId: workerId as string,
        name: threadName,
      });
      setThreads([...threads, newThread]);
      setThreadName("");
    } catch (error) {
      console.log(error);

      setError("Failed to create thread");
    }
  };

  const handleDeleteThread = async (threadId: string) => {
    try {
      await deleteThread(threadId);
      setThreads(threads.filter((thread) => thread.id !== threadId));
    } catch (error) {
      console.log(error);

      setError("Failed to delete thread");
    }
  };

  return (
    <div>
      <h1>Manage Threads for Worker {workerId}</h1>

      {/* Form to create a thread */}
      <div>
        <input
          type="text"
          placeholder="Enter thread name"
          value={threadName}
          onChange={(e) => setThreadName(e.target.value)}
        />
        <button onClick={handleCreateThread}>Create Thread</button>
      </div>

      {/* List of threads */}
      {error && <p>{error}</p>}
      <h2>List of Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            {thread.name}
            <button onClick={() => handleDeleteThread(thread.id)}>
              Delete
            </button>
            <button
              onClick={() =>
                router.push(`/worker/${workerId}/threads/${thread.id}`)
              }
            >
              Manage Files
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadPage;
