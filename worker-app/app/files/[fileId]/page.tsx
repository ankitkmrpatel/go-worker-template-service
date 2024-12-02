import { useState, useEffect } from "react";
import { getFileContent } from "@/lib/goapi";
import dynamic from "next/dynamic";

const ExcelRenderer = dynamic(() => import("@/components/ExcelRenderer"), {
  ssr: false,
});

export default function FileContentPage({
  params,
}: {
  params: { fileId: string };
}) {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { content, type } = await getFileContent(params.fileId);
        setFileContent(content);
        setFileType(type);
      } catch (error) {
        console.error("Failed to fetch file content", error);
      }
    };

    fetchContent();
  }, [params.fileId]);

  if (!fileContent || !fileType) return <p>Loading file content...</p>;

  return (
    <div>
      {fileType === "xml" ? (
        <pre className="xml-viewer">{fileContent}</pre>
      ) : (
        <ExcelRenderer fileContent={fileContent} />
      )}
    </div>
  );
}
