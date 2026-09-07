/* ---------- Mobile nav toggle ---------- */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Hero 3D scene: mouse-follow tilt ---------- */
const heroScene = document.getElementById("heroScene");
const stage = document.getElementById("stage");
if (heroScene && stage && matchMedia("(hover: hover)").matches) {
  heroScene.addEventListener("mousemove", (e) => {
    const rect = heroScene.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 34 - 14;   // base -14deg matches the floating animation
    const rotX = -py * 20 + 8;
    stage.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    stage.style.animationPlayState = "paused";
  });
  heroScene.addEventListener("mouseleave", () => {
    stage.style.transform = "";
    stage.style.animationPlayState = "running";
  });
}

/* ---------- Generic .tilt cards: subtle mouse-follow 3D tilt ---------- */
if (matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".tilt").forEach((card) => {
    const maxTilt = 7;
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- Service / value flip cards: keyboard + tap support ---------- */
document.querySelectorAll(".service-flip, .value-flip").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("is-flipped");
    }
  });
});

/* ---------- Contact form -> opens the visitor's email client ---------- */
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Website enquiry from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\n\nMessage:\n${data.get("message")}`
  );
  const status = form.querySelector(".form-status");
  status.textContent = "Opening your email application…";
  window.location.href = `mailto:envision.hrsolutions@gmail.com?subject=${subject}&body=${body}`;
});
