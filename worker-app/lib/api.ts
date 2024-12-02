// lib/api.ts
import axios from "axios";

const apiBaseUrl = "/api";

// Add a worker
export const createWorker = async (workerData: { name: string }) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/workers`, workerData);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating worker");
  }
};

// List workers
export const listWorkers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/workers`);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error fetching workers");
  }
};

// Create a new thread
export const createThread = async ({
  workerId,
  name,
}: {
  workerId: string;
  name: string;
}) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/workers/${workerId}/threads`,
      { name }
    );
    return response.data; // Return the created thread data
  } catch (error) {
    console.log(error);

    throw new Error("Failed to create thread");
  }
};

// List threads for a specific worker
export const listThreads = async (workerId: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/workers/${workerId}/threads`
    );
    return response.data; // Return the list of threads
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch threads");
  }
};

// Delete a thread by ID
export const deleteThread = async (threadId: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/threads/${threadId}`);
  } catch (error) {
    console.log(error);

    throw new Error("Failed to delete thread");
  }
};

// List files uploaded to a specific thread
export const listFiles = async (threadId: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/threads/${threadId}/files`);
    return response.data; // Return the list of files
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch files");
  }
};

// Upload a file to a specific thread
export const uploadFile = async (threadId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${apiBaseUrl}/threads/${threadId}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Return the uploaded file info
  } catch (error) {
    console.log(error);

    throw new Error("Failed to upload file");
  }
};
