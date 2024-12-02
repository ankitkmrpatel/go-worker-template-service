// lib/goApi.ts
import axios from "axios";

const goApiBaseUrl = "http://localhost:8080";

export const createWorkerInGo = async ({ name }: { name: string }) => {
  try {
    const response = await axios.post(`${goApiBaseUrl}/workers`, { name });
    return response.data;
  } catch {
    throw new Error("Error creating worker in Go API");
  }
};

export const listWorkersFromGo = async () => {
  try {
    const response = await axios.get(`${goApiBaseUrl}/workers`);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error fetching workers from Go API");
  }
};

// Create a new thread for a specific worker
export const createThreadInGo = async ({
  workerId,
  name,
}: {
  workerId: string;
  name: string;
}) => {
  try {
    const response = await axios.post(
      `${goApiBaseUrl}/workers/${workerId}/threads`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating thread in Go API");
  }
};

// List threads for a specific worker
export const listThreadsFromGo = async (workerId: string) => {
  try {
    const response = await axios.get(
      `${goApiBaseUrl}/workers/${workerId}/threads`
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error fetching threads from Go API");
  }
};

// Delete a thread by ID
export const deleteThreadInGo = async (threadId: string) => {
  try {
    await axios.delete(`${goApiBaseUrl}/threads/${threadId}`);
  } catch (error) {
    console.log(error);

    throw new Error("Error deleting thread in Go API");
  }
};

// Fetch file list for a thread
export async function fetchFileList(threadId: string) {
  const response = await fetch(`${goApiBaseUrl}/threads/${threadId}/files`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch files for thread ${threadId}: ${response.statusText}`
    );
  }

  return response.json();
}

// Upload a file to a thread
export async function uploadFileToThread(threadId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${goApiBaseUrl}/threads/${threadId}/files`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload file to thread ${threadId}: ${response.statusText}`
    );
  }

  return response.json();
}

export async function processFiles() {
  try {
    const response = await fetch(`${goApiBaseUrl}/files/process`, {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to process files");
    }

    return response.body; // Return the readable stream directly
  } catch (error) {
    console.error("Error in processFiles:", error);
    throw error;
  }
}

export async function getFileContent(fileID: string): Promise<any> {
  const response = await fetch(`${goApiBaseUrl}/files/${fileID}/content`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch file content");
  }

  return await response.json();
}
