// app/api/workers/route.ts (API endpoint for workers)
import { NextResponse } from "next/server";
import { createWorkerInGo, listWorkersFromGo } from "@/lib/goApi";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  try {
    const newWorker = await createWorkerInGo({ name });
    return NextResponse.json(newWorker);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create worker" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const workers = await listWorkersFromGo();
    return NextResponse.json(workers);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch workers" },
      { status: 500 }
    );
  }
}
