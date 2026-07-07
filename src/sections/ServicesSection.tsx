import { services } from "../data/portfolioData";
import "../styles/services.css";

export function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="sec-label">What I offer</div>
      <h2 className="sec-title grotesk">Productized services</h2>
      <p className="sec-sub">
        Hit me up for any of these requirements or similar projects.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.n}>
            <div className="svc-num mono">{service.n} ——</div>
            <div className="svc-title grotesk">{service.title}</div>
            <div className="svc-desc">{service.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
