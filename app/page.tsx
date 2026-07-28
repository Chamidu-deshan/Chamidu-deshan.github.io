import { AccessibilityEnhancements } from "./AccessibilityEnhancements";
import { MotionControl } from "./MotionControl";
import { PortfolioSite } from "./PortfolioSite";

export default function Home() {
  return (
    <>
      <PortfolioSite />
      <AccessibilityEnhancements />
      <MotionControl />
    </>
  );
}
