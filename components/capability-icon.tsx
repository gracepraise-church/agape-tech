import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  CarFront,
  Clapperboard,
  Cloud,
  Compass,
  HandHeart,
  Handshake,
  HeartPulse,
  Landmark,
  Layers3,
  Lightbulb,
  Network,
  Scale,
  ShieldCheck,
  Sprout,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const icons = {
  activity: Activity,
  "badge-check": BadgeCheck,
  brain: BrainCircuit,
  "car-front": CarFront,
  clapperboard: Clapperboard,
  cloud: Cloud,
  compass: Compass,
  "hand-heart": HandHeart,
  handshake: Handshake,
  "heart-pulse": HeartPulse,
  landmark: Landmark,
  layers: Layers3,
  lightbulb: Lightbulb,
  network: Network,
  scale: Scale,
  shield: ShieldCheck,
  sprout: Sprout,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type CapabilityIconName = keyof typeof icons;

export function CapabilityIcon({
  name,
  size = 20,
}: {
  name: CapabilityIconName;
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.6} />;
}
