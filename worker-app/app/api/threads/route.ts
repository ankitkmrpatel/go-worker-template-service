// app/api/threads/route.ts
import { NextResponse } from "next/server";
import {
  createThreadInGo,
  listThreadsFromGo,
  deleteThreadInGo,
} from "@/lib/goApi";

// Create a new thread
export async function POST(request: Request) {
  const { workerId, name } = await request.json();
  try {
    const newThread = await createThreadInGo({ workerId, name });
    return NextResponse.json(newThread);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create thread" },
      { status: 500 }
    );
  }
}

// List all threads for a worker
export async function GET(request: Request) {
  const { workerId } = request.url;

  try {
    const threads = await listThreadsFromGo(workerId);
    return NextResponse.json(threads);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch threads" },
      { status: 500 }
    );
  }
}

// Delete a thread
export async function DELETE(request: Request) {
  const { threadId } = await request.json();
  try {
    await deleteThreadInGo(threadId);
    return NextResponse.json({ message: "Thread deleted" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to delete thread" },
      { status: 500 }
    );
  }
}
