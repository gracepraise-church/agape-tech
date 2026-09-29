import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RouteIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RouteIntro({ eyebrow, title, description }: RouteIntroProps) {
  return (
    <main className="route-page page-shell" id="main-content">
      <div className="route-intro">
        <span className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="route-next-step">
          <span>We’re building this page thoughtfully.</span>
          <Link href="/contact/">
            Start a conversation <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
