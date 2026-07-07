import { navLinks } from "../data/portfolioData";
import { useScrollState } from "../hooks/useScrollState";
import "../styles/nav-footer.css";
import { scrollToSection } from "../utils/scrollToSection";

export function NavBar() {
  const scrolled = useScrollState();

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-logo grotesk">
        dhruv<span>.</span>dev
      </div>

      <div className="nav-center">
        {navLinks.map((link) => (
          <a
            key={link.id}
            className="nav-link"
            href={`#${link.id}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        className="nav-cta"
        type="button"
        onClick={() => scrollToSection("contact")}
      >
        Hire me →
      </button>
    </nav>
  );
}
