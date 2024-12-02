"use client";

import React, { useState, useEffect } from "react";

export default function UploadProcessingPage() {
  const [progress, setProgress] = useState<string>("Processing started...");
  const [fileData, setFileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/files/process");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "progress") {
        setProgress(data.message);
      } else if (data.type === "result") {
        setFileData(data.result);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setError("Error occurred during processing.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>File Upload Processing</h1>
      <p>{progress}</p>
      {error && <p className="error">{error}</p>}
      {fileData && (
        <div>
          <h2>Processing Result</h2>
          {fileData.type === "xml" && (
            <pre>{fileData.content.slice(0, 50 * 1024)}</pre>
          )}
          {fileData.type === "excel" && (
            <div>
              <p>Worksheet Names: {fileData.worksheetNames.join(", ")}</p>
              <table border="1">
                <thead>
                  <tr>
                    {fileData.headers.map((header: string) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.rows.map((row: any, index: number) => (
                    <tr key={index}>
                      {row.map((cell: any, idx: number) => (
                        <td key={idx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
