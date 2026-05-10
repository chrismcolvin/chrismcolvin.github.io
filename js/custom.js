// Table of contents scroll tracker
window.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.intersectionRatio > 0) {
        document
          .querySelector(`nav#TableOfContents li a[href*="#${id}"]`)
          .parentElement.classList.add("active");
      } else {
        document
          .querySelector(`nav#TableOfContents li a[href*="#${id}"]`)
          .parentElement.classList.remove("active");
      }
    });
  });

  // Track all sections that have an `id` applied
  document
    .querySelectorAll(
      ".content-section h1[id], .content-section h2[id], .content-section h3[id], .content-section h4[id], .content-section h5[id], .content-section h6[id]",
    )
    .forEach((section) => {
      observer.observe(section);
    });
});

// Select the home social icon parents
function homeSocial() {
  const icons = document.querySelectorAll("svg.home-social");

  if (icons) {
    icons.forEach(function (icon) {
      icon.parentElement.parentElement.classList.add("home-social");
    });
  }
}

// Image Popup Links
function imgLinks() {
  const imgs = document.querySelectorAll(".content-section figure");
  const imgHolder = document.querySelector(".img-holder");
  const imgClose = document.querySelector(".img-close");

  imgs.forEach(function (img) {
    const link = img.querySelector("a");

    if (link) {
      const linkRef = link.getAttribute("href");

      link.addEventListener("click", function (e) {
        e.preventDefault();
        imgHolder.classList.add("active");
        imgClose.classList.add("active");
        imgHolder.innerHTML = '<img src="' + linkRef + '">';

        imgClose.addEventListener("click", function () {
          imgHolder.classList.remove("active");
          imgClose.classList.remove("active");
        });

        imgHolder.addEventListener("click", function (e) {
          if (e.target === imgHolder.querySelector("img")) {
            // Do nothing
          } else {
            imgHolder.classList.remove("active");
            imgClose.classList.remove("active");
          }
        });
      });
    }
  });
}

// Photoroll View Toggle
function photorollToggle() {
  // Get the article
  const article = document.querySelector("article.photoroll");

  // If it exists...
  if (article) {
    // Get the toggle
    const toggle = article.querySelector(".photoroll h2.view-switcher");

    // If it exists...
    if (toggle) {
      // listen for clicks
      toggle.addEventListener("click", function () {
        // Toggle class
        if (toggle.classList.contains("grid")) {
          toggle.classList.add("roll");
          toggle.classList.remove("grid");
          article.classList.add("roll");
          article.classList.remove("grid");
        } else {
          toggle.classList.remove("roll");
          toggle.classList.add("grid");
          article.classList.remove("roll");
          article.classList.add("grid");
        }
      });
    }
  }
}

// Portfolio filters
function filtersFn() {
  // Get the filter buttons
  const filterBtns = document.querySelectorAll("button.filter");
  // Get the filter items
  const filterItems = document.querySelectorAll("[data-filter]");

  // If there are any...
  if (filterBtns.length > 0 && filterItems.length > 0) {
    // For each button
    filterBtns.forEach(function (filterBtn) {
      // When clicked
      filterBtn.addEventListener("click", function () {
        // Get the ID
        const btnID = this.getAttribute("id");

        // Add active class, but remove the active class from all other buttons
        filterBtns.forEach(function (filterBtn) {
          filterBtn.classList.remove("active");
        });
        this.classList.add("active");

        // For each filter item
        filterItems.forEach(function (filterItem) {
          // If the filter data does not match the button ID, otherwise don't hide
          const filterFor = filterItem.getAttribute("data-filter");

          if (filterFor.includes(btnID)) {
            filterItem.classList.remove("hide");
          } else {
            filterItem.classList.add("hide");
          }
        });

        // However, if 'All' is clicked, show all
        if (btnID === "all") {
          filterItems.forEach(function (filterItem) {
            filterItem.classList.remove("hide");
          });
        }
      });
    });
  } else {
    // Do nothing
  }
}

// Highlight footnotes when anchor link is clicked
function footnotesFn() {
  const docLinks = document.querySelectorAll("a");

  if (docLinks.length > 0) {
    docLinks.forEach(function (docLink) {
      const linkHref = docLink.getAttribute("href");

      if (linkHref.includes("#fn:")) {
        const fnNum = linkHref.replace(/\D/g, "");

        docLink.addEventListener("click", function () {
          const fnIds = document.querySelectorAll('[id^="fn:"]');

          if (fnIds.length > 0) {
            fnIds.forEach(function (fnId) {
              const fnIdHref = fnId.getAttribute("id");
              const fnIdNum = fnIdHref.replace(/\D/g, "");

              if (fnIdNum === fnNum) {
                fnId.classList.add("highlight");

                setTimeout(function () {
                  fnId.classList.remove("highlight");
                }, 5000);
              }
            });
          }
        });
      }
    });
  }
}

// Make x's and y's z's italic when solo and em'd
function mathFn() {
  const maths = document.querySelectorAll("em");

  if (maths.length > 0) {
    maths.forEach(function (math) {
      const mathText = math.innerText;

      if (mathText === "x" || mathText === "y" || mathText === "z") {
        math.style.fontFamily = "serif";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Select all potential image links:
  // 1. Catches old posts using standard image extensions
  // 2. Catches our new shortcode via the .lightbox-trigger class
  const imageLinks = document.querySelectorAll(
    'a[href$=".jpg" i], a[href$=".jpeg" i], a[href$=".png" i], a[href$=".gif" i], a[href$=".webp" i], a.lightbox-trigger',
  );

  if (imageLinks.length === 0) return;

  // Build the Modal DOM elements dynamically
  const modal = document.createElement("div");
  modal.className = "lightbox-modal";
  modal.innerHTML = `
    <button class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-btn lightbox-prev" aria-label="Previous">&#10094;</button>
    <img class="lightbox-content" src="" alt="Full screen image">
    <button class="lightbox-btn lightbox-next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector(".lightbox-content");
  const closeBtn = modal.querySelector(".lightbox-close");
  const prevBtn = modal.querySelector(".lightbox-prev");
  const nextBtn = modal.querySelector(".lightbox-next");

  let currentGallery = [];
  let currentIndex = 0;

  // Logic to show a specific image and toggle arrows
  function showImage(index) {
    if (index < 0) index = currentGallery.length - 1;
    if (index >= currentGallery.length) index = 0;
    currentIndex = index;
    modalImg.src = currentGallery[currentIndex];

    // Hide arrows if it's a single old image, show them if it's a gallery
    if (currentGallery.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = ""; // Reverts to flex
      nextBtn.style.display = "";
    }
  }

  function openModal(galleryArray, index) {
    currentGallery = galleryArray;
    showImage(index);
    modal.classList.add("active");
    document.body.classList.add("lightbox-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    modalImg.src = "";
  }

  // Add click listeners to all found image links
  imageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Determine if this image is part of a newly formatted gallery
      const galleryContainer = link.closest(".gallery");
      let galleryArray = [];
      let clickedIndex = 0;

      if (galleryContainer) {
        // It's a gallery! Build an array of just the images in this block
        const linksInGallery = Array.from(
          galleryContainer.querySelectorAll("a"),
        );
        galleryArray = linksInGallery.map((a) => a.getAttribute("href"));
        clickedIndex = linksInGallery.indexOf(link);
      } else {
        // It's an older, standalone image! Make an array of 1.
        galleryArray = [link.getAttribute("href")];
        clickedIndex = 0;
      }

      openModal(galleryArray, clickedIndex);
    });
  });

  // Button & Background Listeners
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    // Only allow arrow navigation if it's a gallery
    if (currentGallery.length > 1) {
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    }
  });

  // Mobile Swiping Logic
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    if (currentGallery.length <= 1) return; // Don't allow swiping on single images
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) showImage(currentIndex + 1);
    if (touchEndX > touchStartX + swipeThreshold) showImage(currentIndex - 1);
  }
});

// Run Scripts
window.addEventListener(
  "load",
  function () {
    // Add scripts here
    homeSocial();
    // imgLinks();
    photorollToggle();
    filtersFn();
    footnotesFn();
    mathFn();
  },
  false,
);
