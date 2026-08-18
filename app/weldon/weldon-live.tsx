"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./weldon.module.css";

type RequestableSong = {
  id: number | string;
  title: string;
  artist: string;
  requestCount?: number;
  requested?: boolean;
};

type WeldonSession = {
  active: boolean;
  stagingOffline?: boolean;
  sessionId?: string;
  requestsEnabled: boolean;
  wildcardRequestsEnabled: boolean;
  wildcardRequestedByYou: boolean;
  gig?: {
    name?: string;
    venue?: string;
    date?: string;
    venueInfoText?: string;
    venueInfoUrl?: string;
  };
  songs: RequestableSong[];
};

const POLL_INTERVAL = 5_000;
const CLIENT_ID_KEY = "weldon-live-client-id";
const SONG_TITLE_COLLATOR = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function safeHttpUrl(value: unknown) {
  const rawUrl = stringValue(value);
  if (!rawUrl) return "";
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function normalizeSong(value: unknown): RequestableSong | null {
  if (!value || typeof value !== "object") return null;
  const song = value as Record<string, unknown>;
  const id = song.id ?? song.songId;
  const title = stringValue(song.title);
  if ((typeof id !== "number" && typeof id !== "string") || !title) return null;
  return {
    id,
    title,
    artist: stringValue(song.artist),
    requestCount: Number.isFinite(Number(song.requestCount))
      ? Number(song.requestCount)
      : undefined,
    requested: song.requestedByYou === true || song.requested === true,
  };
}

function normalizeSession(value: unknown): WeldonSession {
  const root = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const nested = root.session && typeof root.session === "object"
    ? (root.session as Record<string, unknown>)
    : root;
  const action = stringValue(nested.action).toLowerCase();
  const status = stringValue(nested.status).toLowerCase();
  const active = nested.active === true || status === "live" || action === "start" || action === "card";
  const sourceSongs = nested.songs ?? nested.requestableSongs ?? nested.eligibleSongs;
  const songs = Array.isArray(sourceSongs)
    ? sourceSongs
      .map(normalizeSong)
      .filter((song): song is RequestableSong => Boolean(song))
      .sort((left, right) => SONG_TITLE_COLLATOR.compare(left.title, right.title))
    : [];
  const rawGig = nested.gig && typeof nested.gig === "object"
    ? (nested.gig as Record<string, unknown>)
    : nested;
  const gig = {
    name: stringValue(rawGig.name || rawGig.gigName || nested.gigName),
    venue: stringValue(rawGig.venue || rawGig.location || nested.venue),
    date: stringValue(rawGig.date || nested.date),
    venueInfoText: stringValue(
      rawGig.venueInfoText || rawGig.venue_info_text || nested.venueInfoText || nested.venue_info_text,
    ),
    venueInfoUrl: safeHttpUrl(
      rawGig.venueInfoUrl
      || rawGig.venue_info_url
      || rawGig.venueWebsiteUrl
      || rawGig.venueWebsite
      || nested.venueInfoUrl
      || nested.venue_info_url,
    ),
  };
  return {
    active,
    stagingOffline: nested.stagingOffline === true,
    sessionId: stringValue(nested.sessionId || nested.sessionKey || nested.gigStartedAt),
    requestsEnabled: nested.requestsEnabled !== false,
    wildcardRequestsEnabled: nested.wildcardRequestsEnabled === true,
    wildcardRequestedByYou: nested.wildcardRequestedByYou === true,
    gig,
    songs,
  };
}

function clientIdFromBrowser() {
  const existing = stringValue(sessionStorage.getItem(CLIENT_ID_KEY));
  if (existing) return existing;
  const clientId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

function Icon({ name }: { name: "music" | "tip" | "venue" | "instagram" | "arrow" }) {
  if (name === "music") return <span aria-hidden="true" className={styles.icon}>♫</span>;
  if (name === "tip") return <span aria-hidden="true" className={styles.icon}>$</span>;
  if (name === "venue") return <span aria-hidden="true" className={styles.icon}>⌖</span>;
  if (name === "instagram") return <span aria-hidden="true" className={styles.icon}>◎</span>;
  return <span aria-hidden="true" className={styles.arrow}>→</span>;
}

export default function WeldonLive() {
  const [session, setSession] = useState<WeldonSession | null>(null);
  const [requested, setRequested] = useState<Array<number | string>>([]);
  const [pendingSongId, setPendingSongId] = useState<number | string | null>(null);
  const [wildcardTitle, setWildcardTitle] = useState("");
  const [wildcardArtist, setWildcardArtist] = useState("");
  const [wildcardPending, setWildcardPending] = useState(false);
  const [wildcardSent, setWildcardSent] = useState(false);
  const [notice, setNotice] = useState("");
  const previousSessionId = useRef("");
  const requestContext = useRef({ clientId: "" });
  const endpoint = "/api/weldon";

  const loadSession = useCallback(async (id: string) => {
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(id ? { "X-Weldon-Client-Id": id } : {}),
      },
    });
    if (!response.ok) throw new Error("Weldon Live is temporarily unavailable");
    const nextSession = normalizeSession(await response.json());
    setSession(nextSession);
    if (previousSessionId.current && previousSessionId.current !== nextSession.sessionId) {
      setRequested([]);
      setWildcardTitle("");
      setWildcardArtist("");
      setWildcardSent(false);
      setNotice("");
    }
    previousSessionId.current = nextSession.sessionId || "";
  }, [endpoint]);

  useEffect(() => {
    const id = clientIdFromBrowser();
    requestContext.current = { clientId: id };
    let stopped = false;
    let timer = 0;
    const poll = async () => {
      try {
        await loadSession(id);
      } catch {
        if (!stopped) setSession({ active: false, requestsEnabled: false, wildcardRequestsEnabled: false, wildcardRequestedByYou: false, songs: [] });
      } finally {
        if (!stopped) timer = window.setTimeout(() => void poll(), POLL_INTERVAL);
      }
    };
    void poll();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [loadSession]);

  async function requestSong(song: RequestableSong) {
    if (pendingSongId !== null || requested.includes(song.id)) return;
    setPendingSongId(song.id);
    setNotice("");
    const { clientId } = requestContext.current;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(clientId ? { "X-Weldon-Client-Id": clientId } : {}),
        },
        body: JSON.stringify({ songId: song.id, sessionId: session?.sessionId || "" }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(stringValue(result.error) || "That request could not be sent");
      setRequested((current) => [...current, song.id]);
      setNotice(`“${song.title}” is with the band. Requests are suggestions, so keep your fingers crossed.`);
      await loadSession(clientId).catch(() => undefined);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "That request could not be sent");
    } finally {
      setPendingSongId(null);
    }
  }

  async function requestWildcard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = wildcardTitle.trim();
    const artist = wildcardArtist.trim();
    if (!title || wildcardPending || wildcardSent || session?.wildcardRequestedByYou) return;
    setWildcardPending(true);
    setNotice("");
    const { clientId } = requestContext.current;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(clientId ? { "X-Weldon-Client-Id": clientId } : {}),
        },
        body: JSON.stringify({ requestType: "wildcard", sessionId: session?.sessionId || "", title, artist }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(stringValue(result.error) || "That suggestion could not be sent");
      setWildcardSent(true);
      setNotice(`“${title}” is with the band. We’ll try it if we can.`);
      await loadSession(clientId).catch(() => undefined);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "That suggestion could not be sent");
    } finally {
      setWildcardPending(false);
    }
  }

  if (session === null) {
    return (
      <main className={styles.loadingScreen}>
        <span className={styles.loadingDot} aria-hidden="true" />
        <p>Checking whether Weldon is live…</p>
      </main>
    );
  }

  if (!session.active) {
    return (
      <main className={styles.restScreen}>
        <Image
          alt="Weldon sleeping and dreaming about working on pipes"
          className={styles.restImage}
          fill
          priority
          sizes="100vw"
          src="/weldon-resting.png"
        />
        <div className={styles.restShade} aria-hidden="true" />
        <section className={styles.restMessage}>
          <p>{session.stagingOffline ? "Weldon Staging" : "Weldon Live"}</p>
          <h1>
            {session.stagingOffline
              ? "Weldon staging is offline right now"
              : "Weldon is taking a rest right now"}
          </h1>
          <Link href="/">Visit The Pipe Dream <Icon name="arrow" /></Link>
        </section>
      </main>
    );
  }

  const gigTitle = session.gig?.name || "The Pipe Dream is live";
  const gigDetails = [session.gig?.venue, session.gig?.date].filter(Boolean).join(" · ");
  const venueInfoText = session.gig?.venueInfoText || "";
  const venueInfoUrl = session.gig?.venueInfoUrl || "";
  const venueActionHref = venueInfoText ? "#venue-info" : venueInfoUrl;

  return (
    <main className={styles.pageShell}>
      <article className={styles.livePanel}>
        <div className={styles.liveBar}>
          <span className={styles.liveDot} aria-hidden="true" />
          <span>Weldon Live</span>
        </div>

        <header className={styles.hero}>
          <Image
            alt="Weldon relaxing at the bar during a live show"
            className={styles.heroImage}
            height={683}
            priority
            sizes="(max-width: 680px) 100vw, 680px"
            src="/weldon-live-banner.png"
            width={2048}
          />
        </header>

        <section className={styles.gigCard}>
          <p>Happening now</p>
          <h1>{gigTitle}</h1>
          {gigDetails ? <span>{gigDetails}</span> : null}
        </section>

        <nav aria-label="Weldon Live options" className={styles.actionGrid}>
          <a className={`${styles.actionButton} ${styles.requestAction}`} href="#song-requests">
            <Icon name="music" />
            <span>Request a song</span>
          </a>
          <a className={`${styles.actionButton} ${styles.tipAction}`} href="#tip-band">
            <Icon name="tip" />
            <span>Tip the band</span>
          </a>
          {venueActionHref ? (
            <a
              className={`${styles.actionButton} ${styles.venueAction}`}
              href={venueActionHref}
              rel={venueInfoText ? undefined : "noreferrer"}
              target={venueInfoText ? undefined : "_blank"}
            >
              <Icon name="venue" />
              <span>Venue info</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className={`${styles.actionButton} ${styles.venueAction} ${styles.disabledAction}`}
            >
              <Icon name="venue" />
              <span>Venue info</span>
            </span>
          )}
        </nav>

        <section className={styles.requestCard} id="song-requests">
          <div className={styles.requestHeading}>
            <div>
              <p>Your turn</p>
              <h2>{session.requestsEnabled ? "What should we play?" : "Requests are paused"}</h2>
              <span>{session.requestsEnabled
                ? "Pick from songs the band can still work into the show."
                : "The band can reopen requests later in the show."}</span>
            </div>
            <Image
              alt="Weldon rocking on an electric guitar"
              height={150}
              src="/weldon-rocking-guitar.png"
              width={150}
            />
          </div>

          {!session.requestsEnabled ? (
            <div className={styles.emptySongs}>
              <Icon name="music" />
              <strong>Song requests are paused right now</strong>
              <span>Weldon is still here for venue details and tips.</span>
            </div>
          ) : session.songs.length ? (
            <ol className={styles.songList}>
              {session.songs.map((song) => {
                const wasRequested = song.requested === true || requested.includes(song.id);
                const isPending = pendingSongId === song.id;
                return (
                  <li className={styles.songRow} key={String(song.id)}>
                    <span className={styles.songCopy}>
                      <strong>{song.title}</strong>
                      {song.artist ? <span>{song.artist}</span> : null}
                      {song.requestCount ? <small>{song.requestCount} crowd request{song.requestCount === 1 ? "" : "s"}</small> : null}
                    </span>
                    <button
                      className={wasRequested ? styles.requestedButton : styles.requestButton}
                      disabled={pendingSongId !== null || wasRequested}
                      onClick={() => void requestSong(song)}
                      type="button"
                    >
                      {isPending ? "Sending…" : wasRequested ? "Requested ✓" : "Request"}
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className={styles.emptySongs}>
              <Icon name="music" />
              <strong>No requestable songs right now</strong>
              <span>Weldon will keep checking as the show moves along.</span>
            </div>
          )}
          {session.requestsEnabled && session.wildcardRequestsEnabled ? (
            <div className={styles.wildcardRequest}>
              <div>
                <p>Don’t see your song?</p>
                <h3>Try a wildcard request</h3>
                <span>Send one song suggestion. The band will try it if they can.</span>
              </div>
              {session.wildcardRequestedByYou || wildcardSent ? (
                <div className={styles.wildcardConfirmation}>Your wildcard request is with the band.</div>
              ) : (
                <form onSubmit={requestWildcard}>
                  <label>
                    <span>Song title</span>
                    <input
                      autoComplete="off"
                      maxLength={120}
                      onChange={(event) => setWildcardTitle(event.target.value)}
                      placeholder="Song title"
                      required
                      value={wildcardTitle}
                    />
                  </label>
                  <label>
                    <span>Artist <small>optional</small></span>
                    <input
                      autoComplete="off"
                      maxLength={120}
                      onChange={(event) => setWildcardArtist(event.target.value)}
                      placeholder="Artist"
                      value={wildcardArtist}
                    />
                  </label>
                  <button disabled={wildcardPending || !wildcardTitle.trim()} type="submit">
                    {wildcardPending ? "Sending…" : "Send wildcard request"}
                  </button>
                </form>
              )}
            </div>
          ) : null}
          <p className={styles.notice} aria-live="polite">{notice}</p>
        </section>

        {venueInfoText ? (
          <section className={styles.venueCard} id="venue-info">
            <div>
              <p>Venue info</p>
              <h2>{session.gig?.venue || "Tonight’s venue"}</h2>
              <span>{venueInfoText}</span>
            </div>
            {venueInfoUrl ? (
              <a href={venueInfoUrl} rel="noreferrer" target="_blank">
                Visit venue website <Icon name="arrow" />
              </a>
            ) : null}
          </section>
        ) : null}

        <section className={styles.tipCard} id="tip-band">
          <Image
            alt="Weldon smiling with cash filling his open head"
            height={180}
            src="/weldon-head-with-cash.png"
            width={180}
          />
          <div>
            <p>Weldon is the tip jar</p>
            <h2>Put a few bucks in his head.</h2>
          </div>
          <a href="https://venmo.com/thepipedreamofficial" rel="noreferrer" target="_blank">
            <Icon name="tip" /> Tip Weldon on Venmo <Icon name="arrow" />
          </a>
        </section>

        <footer className={styles.footer}>
          <a href="https://www.instagram.com/thepipedreamofficial/" rel="noreferrer" target="_blank">
            <Icon name="instagram" /> @thepipedreamofficial
          </a>
          <Link href="/">Visit The Pipe Dream <Icon name="arrow" /></Link>
          <p>No login. No download. Just scan and join the show.</p>
        </footer>
      </article>
    </main>
  );
}
