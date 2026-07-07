import { skillRows } from "../data/portfolioData";
import "../styles/skills.css";

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <div className="sec-label">Technical stack</div>
        <h2 className="sec-title grotesk">Tools I ship with</h2>
        <p className="sec-sub">
          Have real hands on experience with these technologies.
        </p>
      </div>

      <div className="skills-strips">
        {skillRows.map((row) => (
          <div className={`skill-row ${row.className}`} key={row.category}>
            <div className="skill-row-cat">{row.category}</div>
            {row.tags.map((tag) => (
              <div className="skill-cell" key={tag}>
                <span className="skill-dot" />
                {tag}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
