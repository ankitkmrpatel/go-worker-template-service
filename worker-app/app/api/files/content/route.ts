import { NextRequest, NextResponse } from "next/server";
import { getFileContent } from "@/lib/goApi";

export async function POST(req: NextRequest) {
  const { fileID } = await req.json();

  try {
    const content = await getFileContent(fileID);
    return NextResponse.json({ content });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch file content" },
      { status: 500 }
    );
  }
}
