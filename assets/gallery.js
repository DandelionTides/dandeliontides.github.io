"use strict";

// The gallery works with ordinary HTML figure elements:
// copy a .gallery-card in gallery.html to add a new image.
(() => {
  const dialog = document.getElementById("gallery-lightbox");
  const cards = [...document.querySelectorAll(".gallery-card")];
  if (!dialog || !cards.length) return;

  const image = document.getElementById("lightbox-image");
  const counter = document.getElementById("lightbox-counter");
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");
  const closeButton = document.getElementById("lightbox-close");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");
  const stage = document.getElementById("lightbox-stage");
  let currentIndex = 0;
  let launchButton = null;
  let startTouch = null;

  function show(index) {
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];
    const opener = card.querySelector(".gallery-trigger");
    const thumbnail = card.querySelector("img");
    image.src = opener.dataset.full || thumbnail.src;
    image.alt = thumbnail.alt || "放大的照片";
    title.textContent = card.querySelector(".photo-title")?.textContent || "";
    description.textContent = card.querySelector(".photo-description")?.textContent || "";
    counter.textContent = `${currentIndex + 1} / ${cards.length}`;
    prevButton.disabled = cards.length < 2;
    nextButton.disabled = cards.length < 2;
  }

  function open(index, opener) {
    launchButton = opener;
    show(index);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("modal-open");
    closeButton.focus();
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  cards.forEach((card, index) => {
    const opener = card.querySelector(".gallery-trigger");
    opener?.addEventListener("click", () => open(index, opener));
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(currentIndex - 1));
  nextButton.addEventListener("click", () => show(currentIndex + 1));

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    launchButton?.focus();
    launchButton = null;
    image.removeAttribute("src");
  });

  // Click outside the image on the dark backdrop to close.
  stage.addEventListener("click", (event) => {
    if (event.target === stage) close();
  });

  // Escape closes native <dialog>; arrow keys switch pictures.
  document.addEventListener("keydown", (event) => {
    if (!dialog.open || cards.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(currentIndex + 1);
    }
  });

  // On touch screens, a horizontal swipe changes photo.
  image.addEventListener("touchstart", (event) => {
    if (event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    startTouch = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  image.addEventListener("touchend", (event) => {
    if (!startTouch || event.changedTouches.length !== 1 || cards.length < 2) {
      startTouch = null;
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startTouch.x;
    const dy = touch.clientY - startTouch.y;
    startTouch = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      show(currentIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
})();
