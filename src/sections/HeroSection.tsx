import { heroStats, typedMessages } from "../data/portfolioData";
import { useTypewriter } from "../hooks/useTypewriter";
import "../styles/hero.css";
import { scrollToSection } from "../utils/scrollToSection";

export function HeroSection() {
  const typedText = useTypewriter(typedMessages);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="hero-glow2" />

      <div className="hero-layout">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Available for freelance/full-time work.
          </div>

          <h1 className="hero-h1 grotesk">
            <span className="hero-h1-grad">
              Backend, devops &amp;
              <br />
              AI Systems
            </span>
            <br />
            Engineer.
          </h1>

          <div className="hero-terminal mono">
            <span className="terminal-prompt">~$</span>
            <span>{typedText}</span>
            <span className="cursor" />
          </div>

          <p className="hero-desc">
            Full Stack Developer at <strong>SLB</strong>. Former Software Engineer at{" "}
            <strong>Recepto.ai</strong>. Grad IIT Roorkee ECE
            <br />I build{" "}
            <strong>
              production-grade backends, AI pipelines, and search systems
            </strong>{" "}
            that ship fast and scale reliably.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              type="button"
              onClick={() => scrollToSection("contact")}
            >
              Start a project →
            </button>
            <button
              className="btn-outline"
              type="button"
              onClick={() => scrollToSection("projects")}
            >
              View work
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit-ring orbit-r1" />
          <div className="orbit-ring orbit-r2" />
          <div className="orbit-center">⚡</div>
          <div className="orbit-node orbit-n1" style={{ fontSize: 11 }}>
            PY
          </div>
          <div className="orbit-node orbit-n2" style={{ fontSize: 11 }}>
            ES
          </div>
          <div className="orbit-node orbit-n3" style={{ fontSize: 11 }}>
            AI
          </div>
          <div className="orbit-node orbit-n4">RX</div>
          <div className="orbit-node orbit-n5">K8</div>
        </div>
      </div>

      <div className="hero-stats-bar">
        {heroStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-num grotesk">
              {stat.value}
              <em>{stat.suffix}</em>
            </div>
            <div className="stat-lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
