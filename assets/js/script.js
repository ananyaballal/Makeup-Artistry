document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".navigation-menu");
  const sections = document.querySelectorAll(".section");
  const images = document.querySelectorAll(".carousel img");
  const typewriterLetters = document.querySelectorAll(
    ".hero-content h1 .typewriter"
  );
  const faqQuestions = document.querySelectorAll(".faq-question");
  const scenesSlides = document.querySelectorAll(".scene-slide");

  // State variables
  let currentIndex = 0;
  let currentSceneIndex = 0;
  let currentLetterIndex = 0;
  const targetText = "Professional makeup by KEERTHI";

  // Hamburger Menu Toggle
  hamburger.addEventListener("click", () => {
    const isActive = navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    hamburger.textContent = isActive ? "✕" : "☰";
    hamburger.setAttribute("aria-label", isActive ? "Close menu" : "Open menu");
  });

  // Navigation Link Handling with Event Delegation
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      document
        .querySelectorAll(".navigation-menu a")
        .forEach((link) => link.classList.remove("active"));
      e.target.classList.add("active");

      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Open menu");
      }
    }
  });

  // Carousel
  function showNextImage() {
    if (images.length === 0) return;
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }
  if (images.length > 0) {
    setInterval(showNextImage, 3000);
  }

  // Typewriter Effect
  function resetTypewriter() {
    typewriterLetters.forEach((letter) => letter.classList.remove("visible"));
    currentLetterIndex = 0;
  }

  function showNextLetter() {
    if (currentLetterIndex < targetText.length) {
      typewriterLetters[currentLetterIndex].classList.add("visible");
      currentLetterIndex++;
      setTimeout(showNextLetter, 100);
    }
  }

  // Section Visibility Animation
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.id === "home") {
          resetTypewriter();
          showNextLetter();
        }
      } else {
        entry.target.classList.remove("visible");
        if (entry.target.id === "home") {
          resetTypewriter();
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // FAQ Toggle
  document.addEventListener("click", (e) => {
    const question = e.target.closest(".faq-question");
    if (!question) return;

    const answer = question.nextElementSibling;
    const isActive = question.classList.contains("active");

    faqQuestions.forEach((q) => {
      q.classList.remove("active");
      q.nextElementSibling.classList.remove("active");
      q.setAttribute("aria-expanded", "false");
      q.querySelector(".faq-icon").textContent = "+";
    });

    if (!isActive) {
      question.classList.add("active");
      answer.classList.add("active");
      question.setAttribute("aria-expanded", "true");
      question.querySelector(".faq-icon").textContent = "−";
    }
  });

  // Behind the Scenes Slider
  function showNextScene() {
    if (scenesSlides.length === 0) return;
    scenesSlides[currentSceneIndex].classList.remove("active");
    currentSceneIndex = (currentSceneIndex + 1) % scenesSlides.length;
    scenesSlides[currentSceneIndex].classList.add("active");
  }
  if (scenesSlides.length > 0) {
    setInterval(showNextScene, 4000);
  }

  // Contact Form AJAX
  // Contact Form AJAX
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      msg.textContent = "Sending...";
      msg.style.color = "black";

      const data = new FormData(form);

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
        });

        const json = await res.json();

        if (json.status === "success") {
          msg.style.color = "green";
          msg.textContent = `${json.message} Submitted at: ${json.created_at}`;
          form.reset(); // Clear the form
        } else {
          msg.style.color = "red";
          msg.textContent =
            json.message || "Failed to submit. Please try again.";
        }
      } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Server error. Please try again later.";
      }
    });
  }
});
