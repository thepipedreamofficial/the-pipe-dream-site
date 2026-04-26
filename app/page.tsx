export default function Page() {
  const shows = [
    {
      date: "June 13",
      venue: "Rob Ray's Taproom",
      location: "Pearland, TX",
      details: "7-9 PM",
      link: "https://www.robraystaproom.com/",
      image: "/robrayswholeband.jpg",
    },
    {
      date: "August 1",
      venue: "White Linen Night",
      location: "Heights, Houston TX",
      details: "Outdoor stage • White Linen Night street festival • evening set (6–10 PM window)",
      link: "https://19thstreetheights.com/",
      image: "/WLNcrowd.jpg"
    },
  ]

  const photos = [
    { image: "/robrays.jpg" },
    { image: "/wln-stage.jpg" },
    { image: "/bigtop.jpg" },
  ];

  const links = {
    instagram: "https://instagram.com/thepipedreamofficial",
    facebook: "https://www.facebook.com/thepipedreamofficial",
    tips: "https://venmo.com/thepipedreamofficial",
    booking: "mailto:thepipedreamofficial@gmail.com",
  }

  return (
    <div className="min-h-screen bg-[#f3e2b8] text-[#3f220e]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 mb-6 rounded-3xl border-4 border-[#4a2a14] bg-[#f3e2b8]/95 px-4 py-3 shadow-[0_8px_0_0_#4a2a14] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-black tracking-tight sm:text-3xl text-[#b45309]">
                THE PIPE DREAM
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#8d4a16]">
                Houston • high energy • all bangers
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={links.instagram}
                className="rounded-2xl border-2 border-[#4a2a14] bg-[#f1ba00] px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#4a2a14]"
              >
                Instagram
              </a>
              <a
                href={links.tips}
                className="rounded-2xl border-2 border-[#4a2a14] bg-[#b45309] px-4 py-2 text-sm font-bold text-[#f8e7ba] shadow-[3px_3px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#4a2a14]"
              >
                Tip the Band
              </a>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border-4 border-[#4a2a14] bg-[linear-gradient(135deg,#f5e7c5_0%,#efd29e_100%)] p-6 shadow-[0_10px_0_0_#4a2a14] sm:p-8">
              <div className="max-w-2xl">
                <div className="mb-4 inline-block rounded-2xl border-2 border-[#4a2a14] bg-[#f1ba00] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#4a2a14]">
                  Live around Houston
                </div>
                <h1 className="text-4xl font-black leading-none text-[#b45309] sm:text-6xl">
                  The Pipe Dream
                </h1>
                <p className="mt-4 max-w-xl text-base font-medium leading-7 text-[#5a3014] sm:text-lg">
                  Houston cover band. All bangers. 80s to today.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={links.instagram}
                    className="rounded-2xl border-2 border-[#4a2a14] bg-[#f1ba00] px-5 py-3 font-bold shadow-[4px_4px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#4a2a14]"
                  >
                    Follow on Instagram
                  </a>
                  <a
                    href="#shows"
                    className="rounded-2xl border-2 border-[#4a2a14] bg-[#f8e7ba] px-5 py-3 font-bold shadow-[4px_4px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#4a2a14]"
                  >
                    Upcoming Shows
                  </a>
                  <a
                    href="#booking"
                    className="rounded-2xl border-2 border-[#4a2a14] bg-[#b45309] px-5 py-3 font-bold text-[#f8e7ba] shadow-[4px_4px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#4a2a14]"
                  >
                    Book Us
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border-4 border-[#4a2a14] bg-[#d88f34] p-5 shadow-[0_10px_0_0_#4a2a14]">
              <div className="flex h-full min-h-[260px] flex-col justify-between rounded-[1.5rem] border-4 border-[#f1ba00] bg-[#9a4712] p-5 text-[#f8e7ba]">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.3em] text-[#f1ba00]">
                    <img 
                      src="/logo.png" 
                      alt="The Pipe Dream logo" 
                      className="w-full h-auto object-contain rounded-xl"
                    />
                    <div className="mt-4 text-xl font-black text-[#fff2d0]">
                      All bangers. No filler.
                    </div>

                    <p className="mt-4 text-sm leading-6 text-[#f6dfb2]">
                      Crowd favorites, singalongs, and songs people actually know.
                    </p>

                  </div>
                </div>

                <div className="mt-6 rounded-2xl border-2 border-[#f1ba00] bg-[#7a350d] px-4 py-3 text-sm font-semibold">
                  80s • 90s • 2000s • today
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Instagram", href: links.instagram },
              { label: "Facebook", href: links.facebook },
              { label: "Upcoming Shows", href: "#shows" },
              { label: "Tip Jar", href: links.tips },
              { label: "Book Us", href: "#booking" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-[1.75rem] border-4 border-[#4a2a14] bg-[#f8e7ba] px-5 py-5 text-center text-base font-black shadow-[0_8px_0_0_#4a2a14] transition hover:translate-y-[2px] hover:shadow-[0_6px_0_0_#4a2a14]"
              >
                {item.label}
              </a>
            ))}
          </section>

          <section id="shows" className="rounded-[2rem] border-4 border-[#4a2a14] bg-[#f8e7ba] p-6 shadow-[0_10px_0_0_#4a2a14] sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8d4a16]">
                Upcoming Shows
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#b45309] sm:text-4xl">
                Live dates
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {shows.map((show) => (
                <a
                  key={`${show.date}-${show.venue}`}
                  href={show.link}
                  className="rounded-[1.75rem] border-4 border-[#4a2a14] bg-[#f3e2b8] p-5 shadow-[0_8px_0_0_#4a2a14] transition hover:translate-y-[2px] hover:shadow-[0_6px_0_0_#4a2a14]"
                >
                  {show.image && (
                    <img
                      src={show.image}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}

                  <div className="text-sm font-black uppercase tracking-[0.18em] text-[#8d4a16]">
                    {show.date}
                  </div>

                  <div className="mt-2 text-2xl font-black text-[#4a2a14]">
                    {show.venue}
                  </div>

                  <div className="mt-1 text-sm font-semibold text-[#8d4a16]">
                    {show.location}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#5a3014]">
                    {show.details}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border-4 border-[#4a2a14] bg-[#d88f34] p-6 shadow-[0_10px_0_0_#4a2a14] sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f8e7ba]">
                  Photos
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#fff2d0] sm:text-4xl">
                  Live and energetic
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium text-[#fff0cc]">
                A few moments from recent shows.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="rounded-[1.75rem] border-4 border-[#4a2a14] bg-[#f8e7ba] p-4 shadow-[0_8px_0_0_#4a2a14]"
                >             
                  <img
                    src={photo.image}
                    className="w-full h-auto rounded-[1.25rem]"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border-4 border-[#4a2a14] bg-[#9a4712] p-6 text-[#f8e7ba] shadow-[0_10px_0_0_#4a2a14] sm:p-8">
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">

                {/* Weldon Image */}
                <div>
                  <img
                    src="/Weldon.png"
                    alt="Weldon the tip jar"
                    className="w-full max-w-xs mx-auto rounded-xl"
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f1ba00]">
                    Tip jar
                  </p>

                  <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                    Meet Weldon
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#f6dfb2]">
                    He’s our official tip jar.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#f6dfb2]">
                    By day: corporate professional  
                    <br />
                    By night: funds the band
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#f6dfb2]">
                    Buy him a drink 🍺
                  </p>

                  <a
                    href={links.tips}
                    className="mt-6 inline-block rounded-2xl border-2 border-[#f1ba00] bg-[#f1ba00] px-5 py-3 font-black text-[#4a2a14] shadow-[4px_4px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#4a2a14]"
                  >
                    Tip Weldon
                  </a>
                </div>

              </div>
            </div>

            <div
              id="booking"
              className="rounded-[2rem] border-4 border-[#4a2a14] bg-[#f8e7ba] p-6 shadow-[0_10px_0_0_#4a2a14] sm:p-8"
            >
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8d4a16]">
                Contact
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#b45309] sm:text-4xl">
                Let’s play your event
              </h2>

              <p className="mt-4 max-w-lg text-base leading-7 text-[#5a3014]">
                Bars, breweries, parties, music venues, corporate events, and more.
              </p>

              <div className="mt-6 rounded-2xl border-2 border-[#4a2a14] bg-[#f3e2b8] p-4 text-sm font-semibold text-[#4a2a14]">
                thepipedreamofficial@gmail.com
              </div>

              <a
                href={links.booking}
                className="mt-4 inline-block rounded-2xl border-2 border-[#4a2a14] bg-[#b45309] px-5 py-3 font-black text-[#f8e7ba] shadow-[4px_4px_0_0_#4a2a14] transition hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_#4a2a14]"
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
