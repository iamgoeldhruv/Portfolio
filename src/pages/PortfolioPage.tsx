import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { marqueeItems } from "../data/portfolioData";
import { AchievementsSection } from "../sections/AchievementsSection";
import { ContactSection } from "../sections/ContactSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ServicesSection } from "../sections/ServicesSection";
import { SkillsSection } from "../sections/SkillsSection";

export default function PortfolioPage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems
            .flatMap((item) => [item, item])
            .map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
        </div>
      </div>
      <SkillsSection />
      <ServicesSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
