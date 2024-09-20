// js/artisans.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

async function loadArtisans() {
  try {
    const artisansRef = ref(database, "artisans");
    const snapshot = await get(artisansRef);

    if (snapshot.exists()) {
      const artisans = snapshot.val();
      const artisansGrid = document.getElementById('artisans-grid');

      for (let key in artisans) {
        const artisan = artisans[key];

        // Create a wrapper div
        const artisanWrapper = document.createElement('div');
        artisanWrapper.className = 'block cursor-pointer';

        // Add click event to navigate to artisan page
        artisanWrapper.addEventListener('click', () => {
          window.location.href = `artisans/artisan.html?id=${artisan.id}`;
        });

        // Create the artisan card
        const artisanCard = document.createElement('div');
        artisanCard.className = 'artisan-card shadow-lg';

        artisanCard.innerHTML = `
          <img src="${artisan.photo}" alt="${artisan.name}" class="artisan-photo">
          <div class="artisan-info">
            <h3 class="artisan-name">${artisan.name}</h3>
            <p class="artisan-bio">${artisan.bio.substring(0, 100)}...</p>
            <div class="artisan-social mt-4">
              ${artisan.socialMedia.facebook ? `<a href="${artisan.socialMedia.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>` : ''}
              ${artisan.socialMedia.instagram ? `<a href="${artisan.socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
            </div>
          </div>
        `;

        // Append the card to the wrapper
        artisanWrapper.appendChild(artisanCard);

        // Append the wrapper to the grid
        artisansGrid.appendChild(artisanWrapper);
      }
    } else {
      console.log("No artisans found in the database.");
    }
  } catch (error) {
    console.error("Error fetching artisans:", error);
  }
}

export { loadArtisans };
