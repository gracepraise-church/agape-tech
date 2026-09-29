import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found page-shell" id="main-content">
      <span className="eyebrow">
        <span className="eyebrow-mark" aria-hidden="true" />
        PAGE NOT FOUND
      </span>
      <p className="not-found-code">404</p>
      <h1>Looks like this path went a different way.</h1>
      <p className="not-found-copy">
        The page may have moved, or the address might not be quite right. Let’s get you back on
        track.
      </p>
      <div className="not-found-actions">
        <Link className="button button-primary" href="/">
          <ArrowLeft aria-hidden="true" size={17} /> Back to home
        </Link>
        <Link className="text-link" href="/contact/">
          Find a way forward <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </main>
  );
}
