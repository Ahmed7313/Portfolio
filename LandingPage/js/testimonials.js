// js/testimonials.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

async function loadTestimonials() {
  try {
    const testimonialsRef = ref(database, "testimonials");
    const snapshot = await get(testimonialsRef);

    if (snapshot.exists()) {
      const testimonialsObj = snapshot.val();
      const testimonialsSlider = document.getElementById("testimonials-slider");
      const testimonialsArray = Object.values(testimonialsObj);

      testimonialsArray.forEach((testimonial) => {
        testimonialsSlider.innerHTML += `
          <div class="swiper-slide">
            <div class="testimonial-slide">
              <p class="testimonial-quote">${testimonial.quote}</p>
              <p class="testimonial-author">- ${testimonial.author}</p>
            </div>
          </div>
        `;
      });
      initializeTestimonialsSlider();
    } else {
      console.log("No testimonials found in the database.");
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

function initializeTestimonialsSlider() {
  new Swiper('.testimonials-slider', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    pagination: false,
    autoplay: { delay: 7000, disableOnInteraction: false },
  });
}

export { loadTestimonials };
