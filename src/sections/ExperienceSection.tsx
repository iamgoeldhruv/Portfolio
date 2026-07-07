import { SectionHeading } from "../components/SectionHeading";
import { ExperienceCard } from "../components/ExperienceCard";
import { experiences } from "../data/portfolioData";
import "../styles/experience.css";

export function ExperienceSection() {
  return (
    <section className="section exp-section" id="experience">
      <div className="exp-layout">
        <div className="exp-sidebar">
          <SectionHeading
            eyebrow="Work history"
            title="Where I've shipped"
            description="Click any role to expand. Everything here is production work."
          />
        </div>

        <div className="exp-list">
          {experiences.map((experience) => (
            <ExperienceCard
              experience={experience}
              key={`${experience.role}-${experience.company}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
