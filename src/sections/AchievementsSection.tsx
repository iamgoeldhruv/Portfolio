import { achievements } from "../data/portfolioData";
import "../styles/achievements.css";

export function AchievementsSection() {
  return (
    <section className="section ach-section" id="achievements">
      <div className="sec-label">Background</div>
      <h2 className="sec-title grotesk">Credentials &amp; milestones</h2>
      <p className="sec-sub">
        Competitive programming, elite academics, and hackathon podiums.
      </p>

      <div className="ach-grid">
        {achievements.map((achievement) => (
          <article className="ach-card" key={achievement.n}>
            <div className="ach-num">{achievement.n}</div>
            <div className="ach-icon">{achievement.icon}</div>
            <div className="ach-title">{achievement.title}</div>
            <div className="ach-sub">{achievement.sub}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
