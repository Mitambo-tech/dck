// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);

    });
}


// CLOSE MENU AFTER CLICKING A LINK

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

});


// AUTOMATIC YEAR

const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}


// CONTACT FORM

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        if (!name || !email || !message) {

            formMessage.textContent = "Please complete all fields.";

            return;
        }

        const subject = encodeURIComponent("New CDK Website Message");

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        formMessage.textContent =
            "Opening your email application...";

        window.location.href =
            "mailto:cdkenya1@gmail.com?subject=" +
            subject + "&body=" + body;

    });
}

// FEATURED PHOTO SLIDER

const heroSliderTrack = document.querySelector(".hero-slide-track");
const heroSliderPrev = document.querySelector(".hero-slider-prev");
const heroSliderNext = document.querySelector(".hero-slider-next");

if (heroSliderTrack && heroSliderPrev && heroSliderNext) {
    const slides = Array.from(heroSliderTrack.children);
    let currentSlide = 0;

    const showSlide = function (index) {
        currentSlide = (index + slides.length) % slides.length;
        heroSliderTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
    };

    heroSliderPrev.addEventListener("click", function () {
        showSlide(currentSlide - 1);
    });

    heroSliderNext.addEventListener("click", function () {
        showSlide(currentSlide + 1);
    });

    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 3500);
}

// GALLERY FILTERS AND LIGHTBOX

const galleryGrid = document.querySelector(".gallery-grid");
const galleryDialog = document.getElementById("galleryLightbox");

if (galleryGrid && galleryDialog) {
    const filterButtons = document.querySelectorAll(".gallery-filter");
    const lightboxImage = galleryDialog.querySelector("img");
    const lightboxCaption = galleryDialog.querySelector("figcaption");
    const closeButton = galleryDialog.querySelector(".gallery-lightbox-close");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.setAttribute(
                    "aria-pressed",
                    filterButton === button ? "true" : "false"
                );
            });

            galleryGrid.querySelectorAll(".gallery-card").forEach(function (card) {
                card.hidden =
                    selectedCategory !== "all" &&
                    card.dataset.category !== selectedCategory;
            });
        });
    });

    galleryGrid.addEventListener("click", function (event) {
        const card = event.target.closest(".gallery-card");
        if (!card) {
            return;
        }

        const image = card.querySelector("img");
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = card.dataset.caption;
        galleryDialog.showModal();
    });

    closeButton.addEventListener("click", function () {
        galleryDialog.close();
    });

    galleryDialog.addEventListener("click", function (event) {
        if (event.target === galleryDialog) {
            galleryDialog.close();
        }
    });
}