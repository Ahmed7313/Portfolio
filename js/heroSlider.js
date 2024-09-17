// js/heroSlider.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

async function loadHeroSlider() {
  try {
    const headerRef = ref(database, 'projects/header_images');
    const snapshot = await get(headerRef);

    if (snapshot.exists()) {
      const headerImages = snapshot.val();
      const swiperWrapper = document.querySelector('.hero-slider .swiper-wrapper');
      headerImages.forEach((headerImage) => {
        swiperWrapper.innerHTML += `
          <div class="swiper-slide">
            <div class="relative h-screen bg-cover bg-center" style="background-image: url('${headerImage.image_url}')">
              <div class="absolute inset-0 bg-black opacity-50"></div>
              <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 class="text-5xl font-bold mb-4">${headerImage.title}</h1>
                <p class="text-xl max-w-2xl">${headerImage.subtitle}</p>
                <a href="#crafts-grid" class="mt-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white btn-animate">
                  <i class="fas fa-shopping-bag mr-2"></i> Explore Now
                </a>
              </div>
            </div>
          </div>
        `;
      });
      initializeHeroSlider();
    } else {
      console.log("No header images found in the database.");
    }
  } catch (error) {
    console.error("Error fetching header images:", error);
  }
}

function initializeHeroSlider() {
  new Swiper('.hero-slider', {
    loop: true,
    pagination: { el: '.hero-slider .swiper-pagination', clickable: true },
    navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
    effect: 'fade',
    autoplay: { delay: 5000, disableOnInteraction: false },
  });
}

export { loadHeroSlider };
