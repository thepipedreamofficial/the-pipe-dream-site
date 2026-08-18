import { environmentRouting, heistApiUrl } from "../../../lib/server-environment.mjs";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export const dynamic = "force-dynamic";

function upstreamBase() {
  return heistApiUrl("/api/weldon");
}

function limitedHeader(request: Request, name: string, maximum: number) {
  return (request.headers.get(name) || "").trim().slice(0, maximum);
}

function stagingOffline() {
  return environmentRouting().environment === "staging";
}

function stagingOfflineResponse(method: "GET" | "POST") {
  if (method === "GET") {
    return Response.json(
      { active: false, songs: [], stagingOffline: true },
      { status: 200, headers: NO_STORE_HEADERS },
    );
  }
  return Response.json(
    { error: "Weldon staging is offline. Resume staging and try again.", stagingOffline: true },
    { status: 503, headers: NO_STORE_HEADERS },
  );
}

async function upstreamResponse(response: Response) {
  const body = await response.text();
  return new Response(body || "{}", {
    status: response.status,
    headers: { ...NO_STORE_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const clientId = limitedHeader(request, "x-weldon-client-id", 128);
  const url = new URL(upstreamBase());
  if (clientId) url.searchParams.set("visitorId", clientId);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(clientId ? { "X-Weldon-Client-Id": clientId } : {}),
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (stagingOffline() && response.status >= 500) return stagingOfflineResponse("GET");
    return upstreamResponse(response);
  } catch {
    if (stagingOffline()) return stagingOfflineResponse("GET");
    return Response.json(
      { active: false, songs: [], error: "Weldon Live is temporarily unavailable" },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }
}

export async function POST(request: Request) {
  const clientId = limitedHeader(request, "x-weldon-client-id", 128);
  let input: { requestType?: unknown; songId?: unknown; sessionId?: unknown; title?: unknown; artist?: unknown };
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Choose a song to request" }, { status: 400, headers: NO_STORE_HEADERS });
  }
  const wildcard = input.requestType === "wildcard";
  const title = typeof input.title === "string" ? input.title.trim().slice(0, 121) : "";
  const artist = typeof input.artist === "string" ? input.artist.trim().slice(0, 121) : "";
  if (wildcard) {
    if (!title || title.length > 120 || artist.length > 120) {
      return Response.json({ error: "Enter a valid song title and optional artist" }, { status: 400, headers: NO_STORE_HEADERS });
    }
  } else if ((typeof input.songId !== "number" && typeof input.songId !== "string") || String(input.songId).length > 80) {
    return Response.json({ error: "Choose a valid song" }, { status: 400, headers: NO_STORE_HEADERS });
  }
  const sessionId = typeof input.sessionId === "string" ? input.sessionId.trim().slice(0, 160) : "";
  if (!sessionId || !clientId) {
    return Response.json({ error: "Refresh Weldon Live and choose the song again" }, { status: 409, headers: NO_STORE_HEADERS });
  }
  try {
    const response = await fetch(upstreamBase(), {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(clientId ? { "X-Weldon-Client-Id": clientId } : {}),
      },
      body: JSON.stringify(wildcard
        ? { requestType: "wildcard", sessionId, title, artist, visitorId: clientId }
        : { sessionId, songId: input.songId, visitorId: clientId }),
      signal: AbortSignal.timeout(8_000),
    });
    if (stagingOffline() && response.status >= 500) return stagingOfflineResponse("POST");
    return upstreamResponse(response);
  } catch {
    if (stagingOffline()) return stagingOfflineResponse("POST");
    return Response.json(
      { error: "Weldon could not send that request. Try again in a moment." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }
}
