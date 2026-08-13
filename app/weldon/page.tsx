import type { Metadata } from "next";
import WeldonLive from "./weldon-live";

export const metadata: Metadata = {
  title: "Weldon Live | The Pipe Dream",
  description: "Request a song from The Pipe Dream while the band is live.",
};

export default function WeldonPage() {
  return <WeldonLive />;
}
