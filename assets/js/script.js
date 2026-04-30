(function () {
  "use strict";

  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const editToggle = document.getElementById("editToggle");
  const key = "portfolio-theme";
  const editKey = "portfolio-edits";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 820px)").matches;

  // ---------- Theme ----------
  const savedTheme = localStorage.getItem(key);
  if (savedTheme === "light") body.classList.add("light");

  const updateThemeIcon = () => {
    toggleBtn.textContent = body.classList.contains("light") ? "☀️" : "🌙";
  };
  updateThemeIcon();

  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("light");
    localStorage.setItem(key, body.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
    toggleBtn.classList.remove("spin");
    void toggleBtn.offsetWidth;
    toggleBtn.classList.add("spin");
  });

  yearEl.textContent = String(new Date().getFullYear());

  // ---------- Inline Edit ----------
  let editMode = false;
  const edits = JSON.parse(localStorage.getItem(editKey) || "{}");

  document.querySelectorAll("[data-edit]").forEach((el) => {
    const k = el.dataset.edit;
    if (edits[k] != null) {
      if (!el.querySelector("span, svg, img, a, input, button")) {
        el.textContent = edits[k];
      }
    }
  });

  editToggle.addEventListener("click", function () {
    editMode = !editMode;
    body.classList.toggle("edit-mode", editMode);
    this.classList.toggle("active", editMode);
    document.querySelectorAll("[data-edit]").forEach((el) => {
      el.contentEditable = editMode;
    });
  });

  document.addEventListener(
    "blur",
    function (e) {
      if (editMode && e.target.hasAttribute("data-edit")) {
        const k = e.target.dataset.edit;
        edits[k] = e.target.textContent;
        localStorage.setItem(editKey, JSON.stringify(edits));
      }
    },
    true
  );

  document.addEventListener(
    "keydown",
    function (e) {
      if (editMode && e.key === "Enter" && e.target.hasAttribute("data-edit")) {
        e.preventDefault();
        e.target.blur();
      }
    },
    true
  );

  // ---------- Particle Network Canvas ----------
  const canvas = document.getElementById("particleCanvas");
  let ctx, particles, animId;
  let pointer = { x: -1000, y: -1000 };

  function initParticles() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const count = Math.min(Math.floor((w * h) / 18000), 60);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function drawParticles() {
    if (!ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    const isLight = body.classList.contains("light");
    const particleColor = isLight ? "37, 99, 235" : "125, 171, 255";
    const lineColor = isLight ? "37, 99, 235" : "125, 171, 255";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.vx += (dx / dist) * 0.002;
        p.vy += (dy / dist) * 0.002;
      }
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.5) {
        p.vx = (p.vx / speed) * 0.5;
        p.vy = (p.vy / speed) * 0.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${0.15 + p.r * 0.1})`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = dx * dx + dy * dy;
        const maxDist = 120;
        if (dist < maxDist * maxDist) {
          const alpha = (1 - Math.sqrt(dist) / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    drawParticles();
    animId = requestAnimationFrame(animateParticles);
  }

  function startParticles() {
    if (prefersReducedMotion) return;
    initParticles();
    animateParticles();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animId);
      initParticles();
      animateParticles();
    });
  }

  startParticles();

  // ---------- Pointer tracking for particles + glow ----------
  const ambientGlow = document.getElementById("ambientGlow");

  if (!prefersReducedMotion && !isMobile) {
    window.addEventListener(
      "mousemove",
      (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (ambientGlow) {
          ambientGlow.style.left = pointer.x + "px";
          ambientGlow.style.top = pointer.y + "px";
          ambientGlow.style.opacity = "1";
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "mouseleave",
      () => {
        pointer.x = -1000;
        pointer.y = -1000;
        if (ambientGlow) ambientGlow.style.opacity = "0";
      },
      { passive: true }
    );
  }

  // ---------- Typewriter Terminal ----------
  const typewriterEl = document.getElementById("typewriterLine");
  const terminalCursor = document.querySelector(".terminal-cursor");

  if (typewriterEl && !prefersReducedMotion) {
    const messages = [
      "./setup --profile=kk",
      "npm install creativity --global",
      "docker run -p 8080:80 portfolio",
      "git commit -m '✨ make it pop'",
      "pnpm dev -- --open",
    ];
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeTick() {
      const current = messages[msgIdx];
      if (!isDeleting) {
        charIdx++;
        typewriterEl.textContent = current.slice(0, charIdx);
        if (charIdx >= current.length) {
          setTimeout(() => { isDeleting = true; typeTick(); }, 2000);
          return;
        }
      } else {
        charIdx--;
        typewriterEl.textContent = current.slice(0, charIdx);
        if (charIdx <= 0) {
          isDeleting = false;
          msgIdx = (msgIdx + 1) % messages.length;
          setTimeout(typeTick, 400);
          return;
        }
      }
      const delay = isDeleting ? 20 + Math.random() * 15 : 40 + Math.random() * 40;
      setTimeout(typeTick, delay);
    }

    setTimeout(typeTick, 1500);
  }

  // ---------- Animated counters ----------
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            if (!target || el.dataset.animated) return;
            el.dataset.animated = "true";

            const duration = 1200;
            const start = performance.now();
            const startVal = 0;

            function updateCounter(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = Math.round(startVal + (target - startVal) * eased);
              el.textContent = current;
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            }

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  // ---------- Simulated latency ----------
  const latencyEl = document.getElementById("latencyVal");
  if (latencyEl) {
    function updateLatency() {
      const base = 8 + Math.random() * 8;
      latencyEl.textContent = base.toFixed(0) + "ms";
    }
    setInterval(updateLatency, 3000);
  }

  // ---------- Floating badges reveal ----------
  const badges = document.querySelectorAll(".float-badge");
  if (badges.length > 0) {
    setTimeout(() => {
      badges.forEach((b, i) => {
        setTimeout(() => b.classList.add("visible"), i * 300);
      });
    }, 2000);
  }

  // ---------- Scroll Reveal ----------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".section, .hero, .footer, .terminal-bar, .stats-grid").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  // ---------- Scroll Progress + Active Nav ----------
  const progressBar = document.getElementById("scrollProgressBar");
  const navLinks = Array.from(document.querySelectorAll('.sidebar-link[href^="#"]'));
  const sectionMap = new Map();

  navLinks.forEach((link) => {
    const hash = link.getAttribute("href");
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) {
      sectionMap.set(target, link);
    }
  });

  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if (navLinks.length > 0 && sectionMap.size > 0) {
    const visibleRatios = new Map();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestSection = null;
        let bestRatio = 0;
        visibleRatios.forEach((ratio, sectionEl) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestSection = sectionEl;
          }
        });

        if (bestSection) {
          setActiveLink(sectionMap.get(bestSection));
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      }
    );

    sectionMap.forEach((_link, sectionEl) => {
      sectionObserver.observe(sectionEl);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setActiveLink(link));
    });
  }

  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);

  // ---------- Subtle Parallax + Hover Tilt ----------

  // ---------- Hero Intro Sequence ----------
  const introTargets = [
    ".eyebrow",
    ".hero h1",
    ".hero .lead",
    ".hero-status",
    ".hero-links",
    ".hero-visual",
  ];

  if (!prefersReducedMotion) {
    introTargets.forEach((selector, index) => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.classList.add("intro-seq");
      el.style.setProperty("--intro-delay", `${90 + index * 110}ms`);
    });

    if (isMobile) {
      introTargets.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (!el) return;
        el.style.setProperty("--intro-delay", `${50 + index * 75}ms`);
      });
    }

    requestAnimationFrame(() => {
      body.classList.add("intro-ready");
    });
  }

  if (!prefersReducedMotion && !isMobile) {
    const heroVisual = document.querySelector(".hero-visual");
    const techGrid = document.querySelector(".tech-grid");
    const cards = document.querySelectorAll(".card");
    const glowTargets = document.querySelectorAll(".card, .hero-links a");

    let pointerX = 0;
    let pointerY = 0;
    let scrollY = window.scrollY || 0;

    const onPointerMove = (e) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    const animate = () => {
      const scrollOffset = Math.min(scrollY * 0.015, 8);

      if (heroVisual) {
        heroVisual.style.transform = `translate(${pointerX * 16}px, ${pointerY * 12 + scrollOffset}px)`;
      }
      if (techGrid) {
        techGrid.style.backgroundPosition = `${pointerX * 14}px ${pointerY * 14}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(animate);

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${y * -6}deg) rotateY(${x * 7}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });

    glowTargets.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    });
  }
})();
