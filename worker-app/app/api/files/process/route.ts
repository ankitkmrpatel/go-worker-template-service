import { processFiles } from "@/lib/goApi";

export async function GET() {
  try {
    const body = await processFiles(); // Stream from Go API

    if (!body) {
      return new Response("Error fetching stream", { status: 500 });
    }

    return new Response(body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: "Failed to proxy SSE" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
