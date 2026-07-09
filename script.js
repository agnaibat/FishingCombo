(function () {
  "use strict";

  /* ===== Sticky header on scroll ===== */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ===== Mobile menu ===== */
  var burger = document.getElementById("burger");
  var mainNav = document.getElementById("mainNav");
  burger.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("mobile-open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("mobile-open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ===== Scroll reveal ===== */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ===== FAQ accordion ===== */
  var accItems = document.querySelectorAll(".acc-item");
  accItems.forEach(function (item) {
    var trigger = item.querySelector(".acc-trigger");
    var panel = item.querySelector(".acc-panel");
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      accItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
        other.querySelector(".acc-panel").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + 24 + "px";
      }
    });
  });

  /* ===== Gallery lightbox ===== */
  var lightbox = document.getElementById("lightbox");
  var lightboxInner = document.getElementById("lightboxInner");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var media = item.querySelector("img, svg");
      lightboxInner.innerHTML = "";
      if (media) {
        var clone = media.cloneNode(true);
        var fullSrc = item.getAttribute("data-full");
        if (fullSrc && clone.tagName.toLowerCase() === "img") {
          clone.setAttribute("src", fullSrc);
        }
        lightboxInner.appendChild(clone);
      }
      lightboxCaption.textContent = item.getAttribute("data-caption") || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
