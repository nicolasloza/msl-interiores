
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Nosotros", "Servicios", "Proyectos", "Proceso", "Contacto"];

const PROJECTS = [
  {
    id: 1,
    name: "Casa Palermo",
    category: "Residencial · CABA · 2024",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    id: 2,
    name: "Departamento Núñez",
    category: "Residencial · CABA · 2024",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
  {
    id: 3,
    name: "Casa Tigre",
    category: "Residencial · GBA · 2023",
    img: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=800&q=80",
  },
  {
    id: 4,
    name: "Loft San Telmo",
    category: "Residencial · CABA · 2023",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Proyecto Integral",
    desc: "Diseñamos cada espacio desde cero: distribución, materialidad, mobiliario y paleta. Un proceso completo que convierte tu visión en un hogar coherente y único.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Dirección de Obra",
    desc: "Coordinamos y supervisamos cada etapa de la ejecución. Nos aseguramos de que lo diseñado se construya tal como fue concebido, cuidando tiempos y detalles.",
  },
];

const STEPS = [
  { num: "01", title: "Consulta inicial", desc: "Nos reunimos para entender tu proyecto, necesidades y estilo de vida." },
  { num: "02", title: "Propuesta de diseño", desc: "Desarrollamos una propuesta visual con planos, renders y selección de materiales." },
  { num: "03", title: "Desarrollo", desc: "Ajustamos cada detalle hasta lograr un diseño que te represente completamente." },
  { num: "04", title: "Dirección de obra", desc: "Acompañamos la ejecución para garantizar que el resultado final sea fiel al diseño." },
];

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, className = "", delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function MLSInteriores() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FDFAF5", color: "#2C2420" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FDFAF5; }
        .serif { font-family: 'Playfair Display', serif; }
        .nav-link {
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2C2420;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-link:hover { opacity: 1; }
        .btn-primary {
          display: inline-block;
          padding: 14px 36px;
          border: 1px solid rgba(255,255,255,0.7);
          color: white;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          transition: background 0.3s, color 0.3s;
          font-family: 'Inter', sans-serif;
        }
        .btn-primary:hover { background: rgba(255,255,255,0.15); }
        .btn-dark {
          display: inline-block;
          padding: 14px 36px;
          border: 1px solid #2C2420;
          color: #2C2420;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          transition: background 0.3s, color 0.3s;
          font-family: 'Inter', sans-serif;
        }
        .btn-dark:hover { background: #2C2420; color: #FDFAF5; }
        .btn-light {
          display: inline-block;
          padding: 14px 36px;
          border: 1px solid rgba(253,250,245,0.5);
          color: #FDFAF5;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          transition: background 0.3s;
          font-family: 'Inter', sans-serif;
        }
        .btn-light:hover { background: rgba(253,250,245,0.1); }
        .project-card { position: relative; overflow: hidden; cursor: pointer; }
        .project-card img { 
          width: 100%; 
          aspect-ratio: 4/3; 
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .project-card:hover img { transform: scale(1.04); }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(44,36,32,0.55);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 24px;
        }
        .project-card:hover .project-overlay { opacity: 1; }
        .divider {
          width: 40px;
          height: 1px;
          background: #D4C5A9;
          margin: 24px 0;
        }
        input, textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(253,250,245,0.3);
          padding: 12px 0;
          color: #FDFAF5;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }
        input::placeholder, textarea::placeholder { color: rgba(253,250,245,0.45); }
        input:focus, textarea:focus { border-bottom-color: rgba(253,250,245,0.8); }
        textarea { resize: none; min-height: 100px; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 48px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "#FDFAF5" : "transparent",
        borderBottom: scrolled ? "1px solid #EDE8E0" : "none",
        transition: "background 0.4s ease, border 0.4s ease",
      }}>
        <button
          onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span className="serif" style={{
            fontSize: "20px",
            fontWeight: 500,
            color: scrolled ? "#2C2420" : "white",
            transition: "color 0.4s",
            letterSpacing: "0.04em",
          }}>
            MLS Interiores
          </span>
        </button>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: "40px" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="nav-link"
              onClick={() => scrollTo(link.toLowerCase())}
              style={{ color: scrolled ? "#2C2420" : "rgba(255,255,255,0.85)" }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px" }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: "24px", height: "1px", background: scrolled ? "#2C2420" : "white" }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "#FDFAF5",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "32px",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#2C2420" }}>✕</button>
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link" style={{ fontSize: "20px", opacity: 1, color: "#2C2420" }}
              onClick={() => { scrollTo(link.toLowerCase()); setMenuOpen(false); }}>
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{ position: "relative", height: "100vh", minHeight: "600px" }}>
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85"
          alt="Interior"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(44,36,32,0.35) 0%, rgba(44,36,32,0.55) 100%)" }} />
        <div style={{
          position: "relative", zIndex: 1,
          height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px" }}>
            Diseño de interiores residencial
          </p>
          <h1 className="serif" style={{
            color: "white", fontSize: "clamp(38px, 6vw, 72px)",
            fontWeight: 400, lineHeight: 1.15,
            maxWidth: "720px", marginBottom: "20px",
          }}>
            Tu hogar,<br /><em>rediseñado desde adentro</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: 300, maxWidth: "440px", lineHeight: 1.7, marginBottom: "40px" }}>
            Transformamos casas en hogares únicos, diseñados desde la escucha y construidos con criterio.
          </p>
          <button className="btn-primary" onClick={() => scrollTo("proyectos")}>
            Ver proyectos
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.3)" }} />
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ padding: "100px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <FadeIn>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6F47", marginBottom: "24px" }}>
              El estudio
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, lineHeight: 1.25, marginBottom: "24px" }}>
              Diseñamos desde<br />la escucha
            </h2>
            <div className="divider" />
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#5C4A42", fontWeight: 300, marginBottom: "20px" }}>
              En MLS Interiores creemos que cada hogar es el reflejo de quien lo habita. Por eso, antes de trazar una línea, nos tomamos el tiempo de entender cómo vivís, qué te genera bienestar y qué historia querés que cuente tu espacio.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#5C4A42", fontWeight: 300, marginBottom: "40px" }}>
              Trabajamos proyectos residenciales integrales con un enfoque artesanal: atención al detalle, materialidad cuidada y un proceso cercano de principio a fin.
            </p>
            <button className="btn-dark" onClick={() => scrollTo("contacto")}>
              Hablemos de tu proyecto
            </button>
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
                alt="Detalle de diseño"
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: "-20px", left: "-20px",
                width: "120px", height: "120px",
                background: "#D4C5A9", zIndex: -1,
              }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{ background: "#F0EBE1", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6F47", marginBottom: "16px", textAlign: "center" }}>
              Servicios
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, textAlign: "center", marginBottom: "64px" }}>
              Cómo trabajamos
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 120}>
                <div style={{
                  background: "#FDFAF5",
                  padding: "48px 40px",
                  transition: "transform 0.3s",
                }}>
                  <div style={{ color: "#8B6F47", marginBottom: "24px" }}>{s.icon}</div>
                  <h3 className="serif" style={{ fontSize: "22px", fontWeight: 400, marginBottom: "16px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#5C4A42", fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6F47", marginBottom: "16px" }}>
              Proyectos
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "16px" }}>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}>
                Trabajo reciente
              </h2>
              <span style={{ fontSize: "13px", color: "#8B6F47", letterSpacing: "0.05em" }}>2023 — 2024</span>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <div
                  className="project-card"
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img src={p.img} alt={p.name} />
                  <div className="project-overlay">
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{p.category}</p>
                      <p className="serif" style={{ color: "white", fontSize: "20px", fontWeight: 400 }}>{p.name}</p>
                    </div>
                  </div>
                  {/* Mobile caption (always visible) */}
                  <div style={{ padding: "16px 0 8px" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B6F47", marginBottom: "4px" }}>{p.category}</p>
                    <p className="serif" style={{ fontSize: "17px", fontWeight: 400 }}>{p.name}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" style={{ background: "#2C2420", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4C5A9", marginBottom: "16px", textAlign: "center" }}>
              Proceso
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#FDFAF5", textAlign: "center", marginBottom: "72px" }}>
              Así es trabajar con nosotras
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", position: "relative" }}>
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 100}>
                <div>
                  <p className="serif" style={{ fontSize: "48px", color: "rgba(212,197,169,0.2)", fontWeight: 400, lineHeight: 1, marginBottom: "20px" }}>
                    {step.num}
                  </p>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#FDFAF5", letterSpacing: "0.05em", marginBottom: "12px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.8, color: "rgba(253,250,245,0.55)", fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={{ padding: "100px 48px", background: "#3D2E28" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4C5A9", marginBottom: "20px" }}>
              Contacto
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#FDFAF5", marginBottom: "16px" }}>
              Contanos tu proyecto
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(253,250,245,0.6)", fontWeight: 300, lineHeight: 1.7, marginBottom: "56px" }}>
              Cada proyecto comienza con una conversación. Escribinos y te respondemos a la brevedad.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <input type="text" placeholder="Tu nombre" />
                </div>
                <div>
                  <input type="email" placeholder="Tu email" />
                </div>
              </div>
              <div>
                <textarea placeholder="Contanos sobre tu proyecto..." />
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="btn-light" type="submit">
                  Enviar mensaje
                </button>
              </div>
            </form>

            <div style={{ marginTop: "64px", display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
              <a href="mailto:hola@mlsinteriores.com" style={{ color: "rgba(253,250,245,0.55)", fontSize: "13px", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.color = "#FDFAF5"}
                onMouseOut={e => e.currentTarget.style.color = "rgba(253,250,245,0.55)"}>
                hola@mlsinteriores.com
              </a>
              <a href="https://instagram.com/mls.interiores" target="_blank" rel="noreferrer"
                style={{ color: "rgba(253,250,245,0.55)", fontSize: "13px", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.color = "#FDFAF5"}
                onMouseOut={e => e.currentTarget.style.color = "rgba(253,250,245,0.55)"}>
                @mls.interiores
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#2C2420", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span className="serif" style={{ color: "rgba(253,250,245,0.4)", fontSize: "14px" }}>MLS Interiores</span>
        <span style={{ color: "rgba(253,250,245,0.3)", fontSize: "12px", letterSpacing: "0.05em" }}>© 2024 · Diseño de interiores residencial</span>
      </footer>
    </div>
  );
}
