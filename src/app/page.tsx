import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import MenuSection from "@/components/sections/MenuSection";
import AtmosphereSection from "@/components/sections/AtmosphereSection";
import LocationSection from "@/components/sections/LocationSection";
import InkDivider from "@/components/ui/InkDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InkDivider />
      <ConceptSection />
      <InkDivider />
      <MenuSection />
      <InkDivider />
      <AtmosphereSection />
      <InkDivider />
      <LocationSection />
    </>
  );
}
