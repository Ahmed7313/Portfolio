// js/testimonials.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

async function loadTestimonials() {
  try {
    const testimonialsRef = ref(database, "testimonials");
    const snapshot = await get(testimonialsRef);

    if (snapshot.exists()) {
      const testimonials = snapshot.val();
      const testimonialsSlider = document.getElementById('testimonials-slider');

      for (let key in testimonials) {
        const testimonial = testimonials[key];

        const testimonialSlide = document.createElement('div');
        testimonialSlide.className = 'swiper-slide';

        testimonialSlide.innerHTML = `
          <div class="p-6 bg-white rounded-lg shadow-lg">
            <p class="text-gray-700 italic">"${testimonial.quote}"</p>
            <p class="mt-4 text-right font-semibold">${testimonial.author}</p>
          </div>
        `;
        testimonialsSlider.appendChild(testimonialSlide);
      }

      // Initialize Swiper for Testimonials
      new Swiper('.testimonials-slider', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });
    } else {
      console.log("No testimonials found in the database.");
      const testimonialsSlider = document.getElementById('testimonials-slider');
      testimonialsSlider.innerHTML = '<p class="text-center text-gray-500">No testimonials available at the moment.</p>';
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    const testimonialsSlider = document.getElementById('testimonials-slider');
    testimonialsSlider.innerHTML = `<p class="text-center text-red-500">Error loading testimonials. Please try again later.</p>`;
  }
}

export { loadTestimonials };
