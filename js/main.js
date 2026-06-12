// Hero wavefield — six layered sine waves, one per Frequency band.
(function () {
  const canvas = document.getElementById("wavefield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const BANDS = [
    { freq: 0.004, amp: 60, speed: 0.012, color: "rgba(124, 58, 237, 0.50)", width: 2.5 },
    { freq: 0.007, amp: 44, speed: 0.018, color: "rgba(34, 211, 238, 0.40)", width: 2 },
    { freq: 0.011, amp: 30, speed: 0.026, color: "rgba(167, 139, 250, 0.35)", width: 1.8 },
    { freq: 0.016, amp: 22, speed: 0.034, color: "rgba(6, 182, 212, 0.30)", width: 1.5 },
    { freq: 0.024, amp: 14, speed: 0.046, color: "rgba(196, 181, 253, 0.25)", width: 1.2 },
    { freq: 0.034, amp: 9, speed: 0.06, color: "rgba(139, 233, 249, 0.22)", width: 1 },
  ];

  let w, h, t = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const baseline = h * 0.72;
    for (const band of BANDS) {
      ctx.beginPath();
      ctx.strokeStyle = band.color;
      ctx.lineWidth = band.width;
      for (let x = 0; x <= w; x += 3) {
        const y =
          baseline +
          Math.sin(x * band.freq + t * band.speed * 60) * band.amp *
            (0.6 + 0.4 * Math.sin(x * 0.0008 + t * 0.3));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    t += 0.016;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();

// Reveal-on-scroll for cards.
(function () {
  const targets = document.querySelectorAll(
    ".freq-card, .model-card, .step, .testimonial, .price-card"
  );
  if (!("IntersectionObserver" in window)) return;
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
})();
