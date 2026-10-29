onload = () => {
  document.body.classList.remove("container");

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const savedTheme = localStorage.getItem("flower-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("flower-theme", isDark ? "dark" : "light");
    });
  }

  // Envelope & Love Letter Interactions
  const envelope = document.getElementById("envelope");
  const letterModal = document.getElementById("letterModal");
  const letterClose = document.getElementById("letterClose");
  const letterBackdrop = document.getElementById("letterBackdrop");

  let modalTimer = null;

  const openLetter = () => {
    if (!envelope) return;
    envelope.classList.add("open");
    if (letterModal) {
      if (modalTimer) clearTimeout(modalTimer);
      modalTimer = setTimeout(() => {
        letterModal.classList.add("active");
        letterModal.setAttribute("aria-hidden", "false");
      }, 1050);
    }
  };

  const closeLetter = () => {
    if (modalTimer) clearTimeout(modalTimer);
    if (letterModal) {
      letterModal.classList.remove("active");
      letterModal.setAttribute("aria-hidden", "true");
    }
    if (envelope) {
      envelope.classList.remove("open");
    }
  };

  if (envelope) {
    envelope.addEventListener("click", () => {
      if (envelope.classList.contains("open")) {
        closeLetter();
      } else {
        openLetter();
      }
    });
  }

  if (letterClose) {
    letterClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLetter();
    });
  }

  if (letterBackdrop) {
    letterBackdrop.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLetter();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && letterModal && letterModal.classList.contains("active")) {
      closeLetter();
    }
  });
};

