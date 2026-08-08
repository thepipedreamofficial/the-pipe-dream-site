import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./weldondemo.module.css";

export const metadata: Metadata = {
  title: "Weldon Live Demo | The Pipe Dream",
  description:
    "A concept preview of Weldon Live, The Pipe Dream's interactive crowd experience.",
  robots: {
    index: false,
    follow: false,
  },
};

type IconName =
  | "music"
  | "spark"
  | "star"
  | "tip"
  | "guitar"
  | "instagram"
  | "arrow";

function Icon({ name }: { name: IconName }) {
  const commonProps = {
    "aria-hidden": true,
    className: styles.icon,
    fill: "none",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "music") {
    return (
      <svg {...commonProps}>
        <path d="M18 34V11l20-4v23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d="M18 15l20-4" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
        <ellipse cx="12" cy="35" rx="7" ry="5" fill="currentColor" />
        <ellipse cx="32" cy="31" rx="7" ry="5" fill="currentColor" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...commonProps}>
        <path d="M24 4l3.8 11.2L39 19l-11.2 3.8L24 34l-3.8-11.2L9 19l11.2-3.8L24 4z" fill="currentColor" />
        <path d="M39 30l1.8 5.2L46 37l-5.2 1.8L39 44l-1.8-5.2L32 37l5.2-1.8L39 30zM8 28l1.4 4.1 4.1 1.4-4.1 1.4L8 39l-1.4-4.1-4.1-1.4 4.1-1.4L8 28z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg {...commonProps}>
        <path d="M24 5l5.6 11.4L42 18.2l-9 8.8 2.1 12.4L24 33.5l-11.1 5.9L15 27l-9-8.8 12.4-1.8L24 5z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "tip") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3.5" />
        <path d="M29 17.5c-1-1.7-2.8-2.7-5.3-2.7-3 0-5 1.5-5 3.9 0 5.8 11.2 2.5 11.2 8.5 0 2.5-2.2 4.2-5.5 4.2-2.8 0-5.2-1.2-6.4-3.2M24 11v26" stroke="currentColor" strokeLinecap="round" strokeWidth="3.2" />
      </svg>
    );
  }

  if (name === "guitar") {
    return (
      <svg {...commonProps}>
        <path d="M29 15l12-12 4 4-12 12M35 9l4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        <path d="M31 14c4 5.7 2.8 11.5-1.5 15.8-5.7 5.7-13.3 7.2-17.7 2.8-2.1-2.1-2.5-5.1-1.5-8.1-3-.2-5.4-1.2-6.8-2.6-2.5-2.5-.7-6.6 3-10.3 3.6-3.6 8-5.6 10.6-3 1.3 1.3 2.3 3.6 2.6 6.5 4-1.6 8.2-1.7 11.3-1.1z" fill="currentColor" />
        <circle cx="20" cy="23" r="4.5" fill="#20110b" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="6" y="6" width="36" height="36" rx="10" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="35" cy="13" r="2.3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M8 24h30M28 14l10 10-10 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}

const actionTiles: Array<{
  href: string;
  icon: IconName;
  label: string;
  detail: string;
  tone: string;
}> = [
  {
    href: "#song-requests",
    icon: "music",
    label: "Request a song",
    detail: "Pick from tonight's list",
    tone: styles.tileRed,
  },
  {
    href: "#wildcard",
    icon: "guitar",
    label: "Ask for another",
    detail: "Try your wild-card pick",
    tone: styles.tileOrange,
  },
  {
    href: "#tonights-vibe",
    icon: "star",
    label: "Tonight's vibe",
    detail: "See what's happening",
    tone: styles.tilePurple,
  },
  {
    href: "#tip-weldon",
    icon: "tip",
    label: "Tip the band",
    detail: "Fuel one more song",
    tone: styles.tileGreen,
  },
];

const songs = [
  { title: "Mr. Brightside", artist: "The Killers" },
  { title: "Pink Pony Club", artist: "Chappell Roan" },
  { title: "All the Small Things", artist: "blink-182" },
  { title: "Blinding Lights", artist: "The Weeknd" },
  { title: "The Middle", artist: "Jimmy Eat World" },
];

export default function WeldonDemoPage() {
  return (
    <main className={styles.pageShell}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <article className={styles.livePanel}>
        <div className={styles.demoBar}>
          <span className={styles.liveDot} aria-hidden="true" />
          <span>Weldon Live</span>
          <span className={styles.demoTag}>Concept preview</span>
        </div>

        <header className={styles.hero}>
          <Image
            alt="Weldon, The Pipe Dream's mascot, relaxing at the bar during a live show"
            className={styles.heroBannerImage}
            fill
            priority
            sizes="(max-width: 680px) 100vw, 680px"
            src="/weldon-live-banner.png"
          />
          <p className={styles.screenReaderBannerText}>
            Hey, I&apos;m Weldon. Pressure&apos;s down, drinks are flowing, let&apos;s make some noise.
          </p>
          <div aria-hidden="true" className={styles.mobileHeroCopy}>
            <p>Hey, I&apos;m</p>
            <h1>Weldon.</h1>
            <span>
              Pressure&apos;s down, drinks are flowing, let&apos;s make some <strong>noise.</strong>
            </span>
          </div>
        </header>

        <nav aria-label="Weldon Live options" className={styles.actionGrid}>
          {actionTiles.map((tile) => (
            <a className={`${styles.actionTile} ${tile.tone}`} href={tile.href} key={tile.label}>
              <Icon name={tile.icon} />
              <span className={styles.tileLabel}>{tile.label}</span>
              <span className={styles.tileDetail}>{tile.detail}</span>
            </a>
          ))}
        </nav>

        <section className={styles.requestCard} id="song-requests">
          <div className={styles.sectionHeading}>
            <div className={styles.requestHeadingCopy}>
              <p className={styles.sectionKicker}>Your turn</p>
              <div className={styles.requestTitleRow}>
                <h2>What should we play?</h2>
                <span className={styles.pickPrompt}>
                  Pick one
                  <svg aria-hidden="true" className={styles.pickArrow} fill="none" viewBox="0 0 28 38">
                    <path d="M6 3c8 5 14 12 14 24" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                    <path d="M13 23l7 7 6-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className={styles.requestMascotWrap}>
              <Image
                alt="Weldon rocking on an electric guitar"
                className={styles.requestMascot}
                height={180}
                src="/weldon-rocking-guitar.png"
                width={180}
              />
            </div>
          </div>

          <ol className={styles.songList}>
            {songs.map((song) => (
              <li className={styles.songRow} key={song.title}>
                <span className={styles.songCopy}>
                  <strong>{song.title}</strong>
                  <span>{song.artist}</span>
                </span>
                <button className={styles.requestButton} disabled type="button">
                  Request
                </button>
              </li>
            ))}
          </ol>

          <p className={styles.demoHint}>Demo buttons only — no requests are being sent yet.</p>
        </section>

        <section className={styles.wildcardCard} id="wildcard">
          <div className={styles.wildcardCopy}>
            <p className={styles.sectionKicker}>Don&apos;t see your song?</p>
            <h2>Throw them a wild card.</h2>
            <p>Ask for anything. If the band knows it, you might get lucky.</p>
          </div>
          <Image
            alt="Weldon looking nervous about a surprise song request"
            className={styles.wildcardMascot}
            height={180}
            src="/weldon-scared-face.png"
            width={180}
          />
          <div className={styles.fakeForm}>
            <label htmlFor="wildcard-song">Song or artist</label>
            <div className={styles.inputRow}>
              <input disabled id="wildcard-song" placeholder="e.g. Stacy's Mom" type="text" />
              <button disabled type="button">Ask Weldon</button>
            </div>
          </div>
        </section>

        <section className={styles.vibeCard} id="tonights-vibe">
          <div>
            <p className={styles.sectionKicker}>Tonight&apos;s vibe</p>
            <h2>Loud songs. Cold drinks. Questionable dancing.</h2>
          </div>
          <span className={styles.vibeBadge}>All bangers</span>
        </section>

        <section className={styles.tipCard} id="tip-weldon">
          <div className={styles.tipIconWrap}>
            <Icon name="tip" />
          </div>
          <div className={styles.tipCopy}>
            <p className={styles.sectionKicker}>Request made?</p>
            <h2>Buy the band a round.</h2>
            <p>
              Requests are free. Bribing Weldon is strongly encouraged and helps keep the music going.
            </p>
          </div>
          <div className={styles.tipAmounts} aria-label="Example tip amounts">
            <button disabled type="button">$5</button>
            <button disabled type="button">$10</button>
            <button disabled type="button">Dealer&apos;s choice</button>
          </div>
          <button className={styles.venmoButton} disabled type="button">
            Tip the band on Venmo
            <Icon name="arrow" />
          </button>
        </section>

        <footer className={styles.footer}>
          <a href="https://www.instagram.com/thepipedreamofficial/" rel="noreferrer" target="_blank">
            <Icon name="instagram" />
            <span>
              Follow the chaos
              <strong>@thepipedreamofficial</strong>
            </span>
          </a>
          <Link className={styles.siteLink} href="/">
            Visit The Pipe Dream
            <Icon name="arrow" />
          </Link>
          <p>No login. No download. Just scan and join the show.</p>
        </footer>
      </article>
    </main>
  );
}
