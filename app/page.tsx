import Image from "next/image";

export default function Page() {
  const shows = [
    {
      image: "/gallery/gallery-taproom-wide.webp",
      imageAlt: "The Pipe Dream performing at Rob Ray's Taproom",
      date: "Saturday, September 12, 2026",
      venue: "Rob Ray's Taproom",
      location: "Pearland, TX",
      details: "7–9 PM",
      link: "https://www.robraystaproom.com/",
    },
  ];

  const photos = [
    {
      image: "/gallery/gallery-crowd-moment.webp",
      alt: "The Pipe Dream performing under purple lights at Big Top Lounge",
    },
    {
      image: "/gallery/gallery-taproom-energy.webp",
      alt: "The Pipe Dream singer and guitarists performing at Rob Ray's Taproom",
    },
    {
      image: "/gallery/gallery-white-linen-stage.webp",
      alt: "The Pipe Dream performing outdoors at White Linen Night",
    },
    {
      image: "/gallery/gallery-white-linen-crowd.webp",
      alt: "View from the drum kit toward the White Linen Night crowd",
    },
    {
      image: "/gallery/gallery-taproom-wide.webp",
      alt: "The full Pipe Dream band performing at Rob Ray's Taproom",
    },
    {
      image: "/gallery/gallery-white-linen-band.webp",
      alt: "The Pipe Dream performing for the White Linen Night crowd",
    },
  ];

  const links = {
    instagram: "https://instagram.com/thepipedreamofficial",
    facebook: "https://www.facebook.com/thepipedreamofficial",
    tips: "https://venmo.com/thepipedreamofficial",
    booking:
      "mailto:thepipedreamofficial@gmail.com?subject=The%20Pipe%20Dream%20booking%20inquiry",
  };

  return (
    <div className="min-h-screen bg-[#e9bf85] text-[#3f1e02]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 mb-6 rounded-3xl border-4 border-[#3f1e02] bg-[#e9bf85]/95 px-4 py-3 shadow-[0_8px_0_0_#3f1e02] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-black tracking-tight sm:text-3xl text-[#af4201]">
                THE PIPE DREAM
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#923602]">
                Houston • high energy • all bangers
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={links.instagram}
                className="rounded-2xl border-2 border-[#3f1e02] bg-[#e08e02] px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#3f1e02]"
              >
                Instagram
              </a>
              <a
                href={links.facebook}
                className="rounded-2xl border-2 border-[#3f1e02] bg-[#f4d8a9] px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#3f1e02]"
              >
                Facebook
              </a>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border-4 border-[#3f1e02] bg-[linear-gradient(135deg,#f3dcb6_0%,#e9bf85_100%)] p-6 shadow-[0_10px_0_0_#3f1e02] sm:p-8">
              <div className="max-w-2xl">
                <div className="mb-4 inline-block rounded-2xl border-2 border-[#3f1e02] bg-[#e08e02] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#3f1e02]">
                  Live around Houston
                </div>
                <h1 className="text-4xl font-black leading-none text-[#af4201] sm:text-6xl">
                  The Pipe Dream
                </h1>
                <p className="mt-4 max-w-xl text-base font-medium leading-7 text-[#4d2605] sm:text-lg">
                  Five-piece Houston cover band playing crowd favorites from the &rsquo;90s through today.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#shows"
                    className="rounded-2xl border-2 border-[#3f1e02] bg-[#e08e02] px-5 py-3 font-bold shadow-[4px_4px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#3f1e02]"
                  >
                    Upcoming Shows
                  </a>
                  <a
                    href="#booking"
                    className="rounded-2xl border-2 border-[#3f1e02] bg-[#923602] px-5 py-3 font-bold text-[#fff0cf] shadow-[4px_4px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#3f1e02]"
                  >
                    Book Us
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border-4 border-[#3f1e02] bg-[#d8760a] p-5 shadow-[0_10px_0_0_#3f1e02]">
              <div className="flex h-full min-h-[260px] flex-col justify-between rounded-[1.5rem] border-4 border-[#e08e02] bg-[#923602] p-5 text-[#f4d8a9]">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.3em] text-[#fff0cf]">
                    <Image
                      src="/logo-2026.webp"
                      alt="The Pipe Dream logo"
                      width={1400}
                      height={1046}
                      priority
                      className="w-full h-auto object-contain rounded-xl"
                    />
                    <div className="mt-4 text-xl font-black text-[#fff0cf]">
                      All bangers. No filler.
                    </div>

                    <p className="mt-4 text-sm leading-6 text-[#f4d8a9]">
                      Crowd favorites, singalongs, and songs people actually know.
                    </p>

                  </div>
                </div>

                <div className="mt-6 rounded-2xl border-2 border-[#e08e02] bg-[#5a2502] px-4 py-3 text-sm font-semibold">
                  &rsquo;90s • 2000s • 2010s • today
                </div>
              </div>
            </div>
          </section>

          <section id="shows" className="scroll-mt-40 rounded-[2rem] border-4 border-[#3f1e02] bg-[#f4d8a9] p-6 shadow-[0_10px_0_0_#3f1e02] sm:scroll-mt-28 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#923602]">
                Upcoming Shows
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#af4201] sm:text-4xl">
                Live dates
              </h2>
            </div>

            <div className="mt-6 max-w-3xl">
              {shows.map((show) => (
                <a
                  key={`${show.date}-${show.venue}`}
                  href={show.link}
                  className="grid overflow-hidden rounded-[1.75rem] border-4 border-[#3f1e02] bg-[#e9bf85] shadow-[0_8px_0_0_#3f1e02] transition hover:translate-y-[2px] hover:shadow-[0_6px_0_0_#3f1e02] md:grid-cols-[minmax(240px,0.85fr)_1.15fr]"
                >
                  <div className="relative min-h-56 border-b-4 border-[#3f1e02] md:min-h-full md:border-r-4 md:border-b-0">
                    <Image
                      src={show.image}
                      alt={show.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-sm font-black uppercase tracking-[0.18em] text-[#923602]">
                      {show.date}
                    </div>

                    <div className="mt-2 text-2xl font-black text-[#3f1e02]">
                      {show.venue}
                    </div>

                    <div className="mt-1 text-sm font-semibold text-[#923602]">
                      {show.location}
                    </div>

                    <p className="mt-4 text-base font-bold leading-6 text-[#4d2605]">
                      {show.details}
                    </p>

                    <span className="mt-5 inline-block text-sm font-black underline decoration-2 underline-offset-4">
                      View venue details →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border-4 border-[#3f1e02] bg-[#923602] p-6 shadow-[0_10px_0_0_#3f1e02] sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#fff0cf]">
                  Photos
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#fff0cf] sm:text-4xl">
                  Live and energetic
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium text-[#fff0cf]">
                A few moments from recent shows.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo.image}
                  className="rounded-[1.75rem] border-4 border-[#3f1e02] bg-[#f4d8a9] p-2 shadow-[0_8px_0_0_#3f1e02]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                    <Image
                    src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border-4 border-[#3f1e02] bg-[#923602] p-6 text-[#f4d8a9] shadow-[0_10px_0_0_#3f1e02] sm:p-8">
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">

                {/* Weldon Image */}
                <div>
                  <Image
                    src="/Weldon.png"
                    alt="Weldon the tip jar"
                    width={1254}
                    height={1254}
                    className="w-full max-w-xs mx-auto rounded-xl"
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#fff0cf]">
                    Tip jar
                  </p>

                  <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                    Meet Weldon
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#f4d8a9]">
                    He’s our official tip jar.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#f4d8a9]">
                    By day: corporate professional  
                    <br />
                    By night: funds the band
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#f4d8a9]">
                    Buy him a drink 🍺
                  </p>

                  <a
                    href={links.tips}
                    className="mt-6 inline-block rounded-2xl border-2 border-[#e08e02] bg-[#e08e02] px-5 py-3 font-black text-[#3f1e02] shadow-[4px_4px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#3f1e02]"
                  >
                    Tip Weldon
                  </a>
                </div>

              </div>
            </div>

            <div
              id="booking"
              className="scroll-mt-40 rounded-[2rem] border-4 border-[#3f1e02] bg-[#f4d8a9] p-6 shadow-[0_10px_0_0_#3f1e02] sm:scroll-mt-28 sm:p-8"
            >
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#923602]">
                Contact
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#af4201] sm:text-4xl">
                Let’s play your event
              </h2>

              <p className="mt-4 max-w-lg text-base leading-7 text-[#4d2605]">
                Available for bars, breweries, parties, music venues, corporate events, and private events throughout the Houston area.
              </p>

              <div className="mt-6 rounded-2xl border-2 border-[#3f1e02] bg-[#e9bf85] p-4 text-sm font-semibold text-[#3f1e02]">
                thepipedreamofficial@gmail.com
              </div>

              <a
                href={links.booking}
                className="mt-4 inline-block rounded-2xl border-2 border-[#3f1e02] bg-[#923602] px-5 py-3 font-black text-[#fff0cf] shadow-[4px_4px_0_0_#3f1e02] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#3f1e02]"
              >
                Send us an email
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
