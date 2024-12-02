"use client";

import React, { useState, useEffect } from "react";
import { createWorker, listWorkers } from "../../lib/api";

type WorkerType = {
  id: string;
  name: string;
  description: string;
};

const WorkerPage = () => {
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [workerName, setWorkerName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch workers on page load
    const fetchWorkers = async () => {
      try {
        const workers = await listWorkers();
        setWorkers(workers);
      } catch (error) {
        console.log(error);

        setError("Failed to fetch workers");
      }
    };
    fetchWorkers();
  }, []);

  const handleCreateWorker = async () => {
    try {
      const newWorker = await createWorker({ name: workerName });
      setWorkers([...workers, newWorker]);
      setWorkerName("");
    } catch (error) {
      console.log(error);

      setError("Failed to create worker");
    }
  };

  return (
    <div>
      <h1>Worker Management</h1>

      {/* Form to create a worker */}
      <div>
        <input
          type="text"
          placeholder="Enter worker name"
          value={workerName}
          onChange={(e) => setWorkerName(e.target.value)}
        />
        <button onClick={handleCreateWorker}>Create Worker</button>
      </div>

      {/* Display workers */}
      {error && <p>{error}</p>}
      <h2>List of Workers</h2>
      <ul>
        {workers.map((worker, index) => (
          <li key={index}>{worker.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerPage;
