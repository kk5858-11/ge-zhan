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
})();
