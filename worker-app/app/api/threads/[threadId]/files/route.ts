import { NextResponse } from "next/server";
import { fetchFileList, uploadFileToThread } from "@/lib/goApi";

// Proxy for listing files in a thread
export async function GET(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  const { threadId } = params;

  try {
    // Use centralized fetchFileList from goapi.ts
    const data = await fetchFileList(threadId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Proxy for uploading a file to a thread
export async function POST(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  const { threadId } = params;

  try {
    const formData = await req.formData(); // Extract form data from the request
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    // Use centralized uploadFileToThread from goapi.ts
    const data = await uploadFileToThread(threadId, file as File);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
