import { projects } from "../data/portfolioData";
import "../styles/projects.css";

export function ProjectsSection() {
  return (
    <section className="section projects-section" id="projects">
      <div className="sec-label">Selected projects</div>
      <h2 className="sec-title grotesk">Things I've built</h2>
      <p className="sec-sub">
        Hackathon wins, open-source tools, and production systems used daily.
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="proj-card" key={project.name}>
            <div className="proj-glow" />
            <div className="proj-top">
              <div className="proj-icon">{project.icon}</div>
              {project.link ? (
                <a
                  className="proj-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  ↗ view
                </a>
              ) : null}
            </div>
            <div className="proj-name grotesk">{project.name}</div>
            <div className="proj-desc">{project.desc}</div>
            {project.win ? <div className="proj-win">{project.win}</div> : null}
            <div className="proj-stack">
              {project.stack.map((tag) => (
                <span className="stk-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
