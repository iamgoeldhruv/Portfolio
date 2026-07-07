import { useState } from "react";

import { contactLinks } from "../data/portfolioData";
import "../styles/contact.css";

type ContactState = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

type ContactStatus = "idle" | "loading" | "success" | "error";

const initialState: ContactState = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.projectType || !form.message) {
      setStatus("error");
      setErrorMessage("Please fill all fields before sending.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send the message.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-layout">
        <div>
          <div className="sec-label">Get in touch</div>
          <h2 className="sec-title grotesk">
            Let's build
            <br />
            something real.
          </h2>
          <div className="avail-pill">
            <span className="avail-dot" />
            &nbsp;Open to freelance · 1–2 spots/month
          </div>
          <p className="contact-copy">
            Open for full time as well as freelance opportunities.
          </p>

          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="c-link"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                <span className="c-link-icon">{link.icon}</span>
                <div>
                  <div>{link.label}</div>
                  <div className="c-link-sub">{link.sublabel}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="contact-note">
            Describe your project briefly — I'll reply with a scope and timeline
            estimate within 24 hours.
          </p>

          {status === "success" ? (
            <div className="success-panel">
              <div className="success-mark">✓</div>
              <div className="success-title">Message sent!</div>
              <div className="success-copy">I'll respond within 24 hours.</div>
            </div>
          ) : (
            <div className="form">
              <div className="form-row">
                <input
                  className="finput"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
                <input
                  className="finput"
                  placeholder="Email address"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </div>

              <input
                className="finput"
                placeholder="Project type (e.g. RAG pipeline, scraper, full-stack MVP)"
                value={form.projectType}
                onChange={(event) =>
                  setForm({ ...form, projectType: event.target.value })
                }
              />

              <textarea
                className="ftarea"
                rows={5}
                placeholder="Describe what you need — the more detail, the better my estimate will be."
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
              />

              {status === "error" ? (
                <div className="form-error">{errorMessage}</div>
              ) : null}

              <button
                className="fsend"
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send message →"}
              </button>

              <div className="fnote">
                No commitment. Scope estimate within 24h.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
