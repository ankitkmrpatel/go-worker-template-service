import React, { useState } from "react";

export const FileUploadComponent = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null); // Reset the file input
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};
