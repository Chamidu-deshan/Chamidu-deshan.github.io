"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Theme = "light" | "dark";
type WorkCategory = "all" | "social" | "paid" | "content" | "brand";

type WorkItem = {
  title: string;
  category: Exclude<WorkCategory, "all">;
  label: string;
  image: string;
  overlay: string;
  note: string;
};

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Inside the Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const brands = [
  { name: "Fadna", image: "/assets/fadna.png" },
  { name: "Fadna Life Science", image: "/assets/fadna-life-science.png" },
  { name: "QofL", image: "/assets/qofl.png" },
  { name: "SATINY", wordmark: "SATINY" },
  { name: "Crepe Runner", wordmark: "CREPE RUNNER" },
  { name: "Hype Bam", wordmark: "HYPE BAM" },
  { name: "Seixed", wordmark: "SEIXED" },
  { name: "KBC Original", wordmark: "KBC ORIGINAL" },
];

const workItems: WorkItem[] = [
  {
    title: "Social strategy in motion",
    category: "social",
    label: "Social media",
    image: "/assets/social-work.jpg",
    overlay: "BUILT FOR THE SCROLL. PLANNED FOR THE BRAND.",
    note: "A temporary visual block for social content, community work and campaign storytelling.",
  },
  {
    title: "Performance made visible",
    category: "paid",
    label: "Paid advertising",
    image: "/assets/analytics-work.jpg",
    overlay: "LESS NOISE. A STRONGER SIGNAL.",
    note: "A future home for campaign thinking, media execution and performance highlights.",
  },
  {
    title: "Behind every post",
    category: "content",
    label: "Content production",
    image: "/assets/bts-photoshoot.jpg",
    overlay: "BEHIND EVERY POST, THERE’S A DECISION.",
    note: "A temporary behind-the-scenes image for shoots, production days and the people making it happen.",
  },
  {
    title: "From idea to final frame",
    category: "brand",
    label: "Brand development",
    image: "/assets/bts-camera.jpg",
    overlay: "FROM THE FIRST IDEA TO THE FINAL FRAME.",
    note: "A future case-study block for creative direction, brand development and special project moments.",
  },
];

const tools = [
  { name: "Shopify", icon: "/assets/shopify.svg" },
  { name: "WordPress", icon: "/assets/wordpress.svg" },
  { name: "Meta", icon: "/assets/meta.svg" },
  { name: "Instagram", icon: "/assets/instagram.svg" },
  { name: "Facebook", icon: "/assets/facebook.svg" },
  { name: "Asana", icon: "/assets/asana.svg" },
  { name: "Notion", icon: "/assets/notion.svg" },
  { name: "Google Analytics", icon: "/assets/googleanalytics.svg" },
];

const filters: { label: string; value: WorkCategory }[] = [
  { label: "All", value: "all" },
  { label: "Social", value: "social" },
  { label: "Paid", value: "paid" },
  { label: "Content", value: "content" },
  { label: "Brand", value: "brand" },
];

export function PortfolioSite() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<WorkCategory>("all");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const filteredWork = useMemo(
    () =>
      filter === "all"
        ? workItems
        : workItems.filter((item) => item.category === filter),
    [filter],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("chamidu-theme") as Theme | null;
    const preferredDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(saved ?? (preferredDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("chamidu-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedWork ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, selectedWork]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedWork(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealNodes.forEach((node) => observer.observe(node));

    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress?.style.setProperty("transform", `scaleX(${ratio})`);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const movePortrait = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty("--portrait-x", `${x * 12}px`);
    event.currentTarget.style.setProperty("--portrait-y", `${y * 12}px`);
    event.currentTarget.style.setProperty("--portrait-rx", `${y * -3}deg`);
    event.currentTarget.style.setProperty("--portrait-ry", `${x * 3}deg`);
  };

  const resetPortrait = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--portrait-x", "0px");
    event.currentTarget.style.setProperty("--portrait-y", "0px");
    event.currentTarget.style.setProperty("--portrait-rx", "0deg");
    event.currentTarget.style.setProperty("--portrait-ry", "0deg");
  };

  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="name-link" href="#home" aria-label="Chamidu Deshan, home">
          CHAMIDU DESHAN
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-top">
          <span>CHAMIDU DESHAN</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            CLOSE ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <button type="button" onClick={toggleTheme}>
            SWITCH TO {theme === "light" ? "DARK" : "LIGHT"}
          </button>
          <a href="mailto:cdeshanwork@gmail.com">CDESHANWORK@GMAIL.COM</a>
        </div>
      </div>

      <div id="main-content">
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">
              DIGITAL MARKETER · SOCIAL · PAID · CONTENT · BRAND
            </p>
            <h1>
              <span className="hero-reveal hero-delay-1">I help brands earn</span>
              <span className="hero-reveal hero-delay-2 accent-line">
                attention
              </span>
              <span className="hero-reveal hero-delay-3">
                —and turn it into momentum.
              </span>
            </h1>
            <p className="hero-intro hero-reveal hero-delay-4">
              I’m Chamidu Deshan, a digital marketer working across social media
              marketing, paid advertising, content strategy, and brand
              development.
            </p>
            <div className="hero-actions hero-reveal hero-delay-4">
              <a className="button button-primary" href="#work">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a
                className="button button-secondary"
                href="mailto:cdeshanwork@gmail.com"
              >
                Let’s talk
              </a>
            </div>
          </div>

          <div
            className="hero-portrait-wrap hero-reveal hero-delay-2"
            onPointerMove={movePortrait}
            onPointerLeave={resetPortrait}
          >
            <div className="portrait-orbit" aria-hidden="true">
              <span>SOCIAL</span>
              <span>STRATEGY</span>
              <span>CONTENT</span>
              <span>GROWTH</span>
            </div>
            <div className="portrait-card">
              <img
                src="/assets/chamidu-portrait.jpeg"
                alt="Chamidu Deshan, digital marketer"
              />
              <div className="portrait-caption">
                <span>CHAMIDU DESHAN</span>
                <span>SRI LANKA</span>
              </div>
            </div>
            <div className="portrait-stamp" aria-hidden="true">
              <strong>7+</strong>
              <span>BRANDS</span>
            </div>
          </div>

          <div className="hero-bottom">
            <span>AVAILABLE FOR SELECT OPPORTUNITIES</span>
            <a href="#about">SCROLL TO DISCOVER ↓</a>
          </div>
        </section>

        <section className="statement-strip" aria-label="Marketing disciplines">
          <div className="statement-track">
            {[0, 1].map((group) => (
              <div
                className="statement-group"
                aria-hidden={group === 1}
                key={group}
              >
                <span>ATTENTION IS ONLY THE BEGINNING.</span>
                <i>✦</i>
                <span>SOCIAL. PAID. CONTENT. BRAND.</span>
                <i>✦</i>
              </div>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">01 / ABOUT ME</p>
            <h2>
              Strategy first.
              <br />
              <span>Creativity with a reason.</span>
            </h2>
          </div>

          <div className="about-layout">
            <aside className="about-proof reveal">
              <div className="proof-number">7+</div>
              <p>brands supported across different categories and audiences.</p>
              <div className="proof-rule" />
              <p className="proof-quote">
                “The work should look good—but it should also know exactly why it
                exists.”
              </p>
            </aside>

            <div className="about-story reveal">
              <p className="about-lead">
                I help brands strengthen their digital presence, connect with
                the right audiences, and turn ideas into focused marketing
                action.
              </p>
              <p>
                My work spans social media marketing, paid advertising, content
                strategy, and brand development. I bring those disciplines
                together so every post, campaign, and creative decision supports
                a clearer direction.
              </p>
              <p>
                I’ve worked with more than seven brands—learning how to adapt the
                message, process, and execution while keeping the brand’s
                identity at the centre.
              </p>

              <div className="capability-list" aria-label="Core capabilities">
                {[
                  ["01", "Social Media Marketing"],
                  ["02", "Paid Advertising"],
                  ["03", "Content Strategy"],
                  ["04", "Brand Development"],
                ].map(([number, label]) => (
                  <div className="capability-row" key={number}>
                    <span>{number}</span>
                    <strong>{label}</strong>
                    <span aria-hidden="true">↗</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio" id="portfolio">
          <div className="section-shell portfolio-heading reveal">
            <p className="eyebrow">02 / PORTFOLIO</p>
            <h2>Brands I’ve worked with.</h2>
            <p>
              7+ brands. Four connected disciplines. One focused approach.
            </p>
          </div>

          <div
            className="brand-marquee"
            aria-label="Brands Chamidu has worked with"
          >
            <div className="brand-track">
              {[0, 1].map((group) => (
                <div
                  className="brand-group"
                  aria-hidden={group === 1}
                  key={group}
                >
                  {brands.map((brand) => (
                    <div className="brand-card" key={`${group}-${brand.name}`}>
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={group === 0 ? brand.name : ""}
                        />
                      ) : (
                        <span
                          className={`wordmark wordmark-${brand.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {brand.wordmark}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell portfolio-note reveal">
            <span>FADNA</span>
            <span>FADNA LIFE SCIENCE</span>
            <span>QOFL</span>
            <span>SATINY</span>
            <span>CREPE RUNNER</span>
            <span>HYPE BAM</span>
            <span>SEIXED</span>
            <span>KBC ORIGINAL</span>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="work-header reveal">
            <div>
              <p className="eyebrow">03 / INSIDE THE WORK</p>
              <h2>
                The thinking, making,
                <br />
                and moments <span>behind the work.</span>
              </h2>
            </div>
            <p>
              Campaigns, content, planning, production and the moments that
              usually stay outside the final post.
            </p>
          </div>

          <div className="filter-row reveal" aria-label="Filter work">
            {filters.map((item) => (
              <button
                className={filter === item.value ? "is-active" : ""}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                key={item.value}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="temporary-note reveal">
            Temporary editorial imagery is used until the original project and
            BTS files are added.
          </p>

          <div className="work-grid">
            {filteredWork.map((item, index) => (
              <article className="work-card reveal" key={item.title}>
                <button type="button" onClick={() => setSelectedWork(item)}>
                  <img src={item.image} alt="" />
                  <span className="work-shade" />
                  <span className="work-index">0{index + 1}</span>
                  <span className="work-overlay">{item.overlay}</span>
                  <span className="work-meta">
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <span className="work-open" aria-hidden="true">
                    OPEN ↗
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-statement">
          <div className="closing-copy reveal">
            <span>FROM THE FIRST IDEA</span>
            <span className="outline-text">TO THE FINAL FRAME.</span>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-top reveal">
            <p className="eyebrow">04 / CONTACT ME</p>
            <h2>
              Have a brand ready
              <br />
              for its <span>next move?</span>
            </h2>
          </div>
          <div className="contact-bottom reveal">
            <p>
              If you’re looking for someone to think strategically, create with
              purpose, and care about the details, let’s start a conversation.
            </p>
            <a className="contact-circle" href="mailto:cdeshanwork@gmail.com">
              <span>START A</span>
              <strong>CONVERSATION</strong>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-links reveal">
            <a href="mailto:cdeshanwork@gmail.com">
              cdeshanwork@gmail.com
            </a>
            <div>
              <a
                href="https://www.linkedin.com/in/cdeshan/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.instagram.com/chamiiidu/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="section-shell">
            <div className="footer-intro reveal">
              <p className="eyebrow">THE WORKING STACK</p>
              <h2>Tools are only useful when the thinking is clear.</h2>
              <p>
                Platforms I use across content, campaigns, collaboration and
                measurement.
              </p>
            </div>

            <div
              className="tool-field"
              aria-label="Marketing and collaboration tools"
            >
              <div className="tool-glow tool-glow-one" aria-hidden="true" />
              <div className="tool-glow tool-glow-two" aria-hidden="true" />
              {tools.map((tool, index) => (
                <div
                  className="tool-chip"
                  key={tool.name}
                  style={{ "--delay": `${index * -0.45}s` } as CSSProperties}
                >
                  <img src={tool.icon} alt="" />
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} CHAMIDU DESHAN</span>
              <span>DIGITAL MARKETER · SRI LANKA</span>
              <a href="#home">BACK TO TOP ↑</a>
            </div>
            <p className="image-credit">
              Temporary gallery imagery sourced from Unsplash and Pexels; it
              will be replaced with original project media.
            </p>
          </div>
        </footer>
      </div>

      <div
        className={`work-modal ${selectedWork ? "is-open" : ""}`}
        aria-hidden={!selectedWork}
        role="dialog"
        aria-modal="true"
        aria-label={selectedWork?.title ?? "Work preview"}
      >
        {selectedWork && (
          <div className="work-modal-panel">
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedWork(null)}
              aria-label="Close work preview"
            >
              CLOSE ×
            </button>
            <div className="modal-image">
              <img src={selectedWork.image} alt="" />
              <span>{selectedWork.overlay}</span>
            </div>
            <div className="modal-copy">
              <p className="eyebrow">{selectedWork.label}</p>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.note}</p>
              <div className="modal-placeholder">
                ORIGINAL PROJECT DETAILS AND RESULTS WILL BE ADDED HERE.
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
