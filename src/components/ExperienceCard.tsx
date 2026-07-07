import { useState } from "react";

import type { ExperienceItem } from "../data/portfolioData";
import { RichText } from "./RichText";

type ExperienceCardProps = {
  experience: ExperienceItem;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      className={`exp-card${open ? " open" : ""}`}
      type="button"
      onClick={() => setOpen((value) => !value)}
    >
      <div className="exp-top">
        <div>
          <div className="exp-role">{experience.role}</div>
          <div className="exp-co">{experience.company}</div>
        </div>

        <div className="exp-right">
          <span className="exp-period">{experience.period}</span>
          {experience.badge ? (
            <span
              className={`exp-badge${experience.badgeClass ? ` ${experience.badgeClass}` : ""}`}
            >
              {experience.badge}
            </span>
          ) : null}
        </div>
      </div>

      {open ? (
        <div className="exp-body">
          {experience.bullets.map((bullet, index) => (
            <div className="exp-bullet" key={`${experience.role}-${index}`}>
              <span className="exp-arr">→</span>
              <span>
                <RichText chunks={bullet.chunks} />
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="exp-toggle">{open ? "collapse ↑" : "expand ↓"}</div>
    </button>
  );
}
