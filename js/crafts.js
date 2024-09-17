// js/crafts.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

async function loadCrafts() {
  try {
    const projectsRef = ref(database, "projects");
    const snapshot = await get(projectsRef);
    const projects = snapshot.val();
    const craftsGrid = document.getElementById('crafts-grid');

    for (let key in projects) {
      if (key === 'header_images' || key === 'cursor_image') continue;
      const project = projects[key];

      const craftCard = document.createElement('div');
      craftCard.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300';

      craftCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-2xl font-semibold mb-2">${project.title}</h3>
          <p class="text-gray-700 mb-4">${project.content.substring(0, 100)}...</p>
          <a href="project.html?id=${project.id}" class="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full btn-animate">
            <i class="fas fa-info-circle mr-2"></i> View Details
          </a>
        </div>
      `;
      craftsGrid.appendChild(craftCard);
    }
  } catch (error) {
    console.error("Error fetching crafts:", error);
  }
}

export { loadCrafts };
