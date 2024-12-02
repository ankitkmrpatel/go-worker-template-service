"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listFiles, uploadFile } from "@/lib/api";
import { FileUploadComponent } from "@/components/FileUpload";
import { ThreadInfoComponent } from "@/components/ThreadInfo";

const FilesPage = ({ params }: { params: { threadId: string } }) => {
  const [threadInfo, setThreadInfo] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const router = useRouter();

  const { threadId } = params;

  useEffect(() => {
    // Fetch thread details and file list
    const fetchThreadData = async () => {
      try {
        const threadData = await fetch(`/api/threads/${threadId}`);
        const threadJson = await threadData.json();
        setThreadInfo(threadJson);

        const fileList = await listFiles(threadId);
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching thread data or file list:", error);
      }
    };

    fetchThreadData();
  }, [threadId]);

  const handleFileUpload = async (file: File) => {
    try {
      await uploadFile(threadId, file);
      // Refresh file list after upload
      const updatedFileList = await listFiles(threadId);
      setFiles(updatedFileList);
    } catch (error) {
      console.error("Failed to upload file", error);
    }
  };

  return (
    <div>
      {threadInfo && <ThreadInfoComponent thread={threadInfo} />}

      <div>
        <h2>Upload Files</h2>
        <FileUploadComponent onFileUpload={handleFileUpload} />
      </div>

      <div>
        <h3>Files List</h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
