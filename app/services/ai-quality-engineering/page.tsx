import { ServiceLandingPage } from "@/components/service-landing-page";
import { createPageMetadata } from "@/content/metadata";
import { serviceLandings } from "@/content/service-landings";

const service = serviceLandings.aiQualityEngineering;

export const metadata = createPageMetadata({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.path,
});

export default function AiQualityEngineeringPage() {
  return <ServiceLandingPage service={service} />;
}

