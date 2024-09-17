// js/main.js
import { loadHeroSlider } from './heroSlider.js';
import { loadCrafts } from './crafts.js';
import { loadTestimonials } from './testimonials.js';
import { loadArtisans } from './artisans.js';
import { loadInsights } from './insights.js';

// Hide Loader After Page Load
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
});

// Load Data and Initialize Components
window.onload = () => {
  loadHeroSlider();
  loadCrafts();
  loadTestimonials();
  loadArtisans();
  loadInsights();
};
