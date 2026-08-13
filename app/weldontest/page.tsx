import type { Metadata } from "next";
import WeldonLive from "../weldon/weldon-live";

export const metadata: Metadata = {
  title: "Weldon Test Live | The Pipe Dream",
  description: "Test The Pipe Dream's live Weldon song requests.",
  robots: { index: false, follow: false },
};

export default function WeldonTestPage() {
  return <WeldonLive testMode />;
}
