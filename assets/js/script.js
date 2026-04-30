(function () {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const editToggle = document.getElementById("editToggle");
  const key = "portfolio-theme";
  const editKey = "portfolio-edits";

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

  // Restore saved edits
  document.querySelectorAll("[data-edit]").forEach((el) => {
    const k = el.dataset.edit;
    if (edits[k] != null) {
      // Only restore text content for non-rich elements
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

  // Save on blur
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

  // Save on Enter key (prevents newline insertion in single-line elements)
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

  // ---------- Scroll Reveal ----------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".section, .hero, .footer").forEach((el) => {
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
        threshold: [0.15, 0.3, 0.5, 0.7]
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
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 820px)").matches;

  // ---------- Hero Intro Sequence ----------
  const introTargets = [
    ".eyebrow",
    ".hero h1",
    ".hero .lead",
    ".hero-status",
    ".hero-links",
    ".hero-visual"
  ];

  if (!prefersReducedMotion) {
    introTargets.forEach((selector, index) => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.classList.add("intro-seq");
      el.style.setProperty("--intro-delay", `${80 + index * 90}ms`);
    });

    // 手机端也保留入场动画，但节奏更短，避免拖沓。
    if (isMobile) {
      introTargets.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (!el) return;
        el.style.setProperty("--intro-delay", `${40 + index * 60}ms`);
      });
    }

    requestAnimationFrame(() => {
      body.classList.add("intro-ready");
    });
  }

  // 用户选择了“手机端减弱动画”：在手机端或系统要求减少动画时，直接跳过复杂动效。
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

    // 用 requestAnimationFrame 保持平滑并减少性能压力。
    const animate = () => {
      const scrollOffset = Math.min(scrollY * 0.015, 8);

      if (heroVisual) {
        heroVisual.style.transform = `translate(${pointerX * 10}px, ${pointerY * 8 + scrollOffset}px)`;
      }
      if (techGrid) {
        techGrid.style.backgroundPosition = `${pointerX * 8}px ${pointerY * 8}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(animate);

    // 卡片轻微 3D 倾斜（subtle），鼠标离开后回正。
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });

    // 鼠标跟随高光：仅桌面端启用，元素内部记录相对位置给 CSS 渐变使用。
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
