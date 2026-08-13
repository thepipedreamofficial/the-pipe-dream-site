const DEFAULT_HEIST_TEST_API_URL = "https://portal.pipedreamband.com/api/weldon-test/public";
const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export const dynamic = "force-dynamic";

function upstreamUrl() {
  return (process.env.HEIST_WELDON_TEST_API_URL || DEFAULT_HEIST_TEST_API_URL).trim();
}

function clientId(request: Request) {
  return (request.headers.get("x-weldon-client-id") || "").trim().slice(0, 128);
}

async function upstreamResponse(response: Response) {
  const body = await response.text();
  return new Response(body || "{}", {
    status: response.status,
    headers: { ...NO_STORE_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  try {
    const id = clientId(request);
    const response = await fetch(upstreamUrl(), {
      cache: "no-store",
      headers: { Accept: "application/json", ...(id ? { "X-Weldon-Client-Id": id } : {}) },
      signal: AbortSignal.timeout(8_000),
    });
    return upstreamResponse(response);
  } catch {
    return Response.json(
      { active: false, testMode: true, songs: [], error: "Weldon Test is temporarily unavailable" },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }
}

export async function POST(request: Request) {
  let input: { songId?: unknown; sessionId?: unknown };
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Choose a song to request" }, { status: 400, headers: NO_STORE_HEADERS });
  }
  const sessionId = typeof input.sessionId === "string" ? input.sessionId.trim().slice(0, 80) : "";
  if (!sessionId || (typeof input.songId !== "number" && typeof input.songId !== "string")) {
    return Response.json({ error: "Refresh Weldon Test and choose the song again" }, { status: 409, headers: NO_STORE_HEADERS });
  }
  try {
    const id = clientId(request);
    const response = await fetch(upstreamUrl(), {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...(id ? { "X-Weldon-Client-Id": id } : {}) },
      body: JSON.stringify({ sessionId, songId: input.songId, visitorId: id }),
      signal: AbortSignal.timeout(8_000),
    });
    return upstreamResponse(response);
  } catch {
    return Response.json(
      { error: "Weldon could not send that test request. Try again in a moment." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }
}
