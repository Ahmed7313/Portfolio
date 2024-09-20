// artisans/js/artisan.js
import { database } from '../../js/firebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Function to get query parameter by name
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Function to load artisan details
async function loadArtisanDetails() {
  try {
    // Get the artisan ID from the URL
    const artisanId = getParameterByName('id');

    if (!artisanId) {
      document.getElementById('artisan-details').innerHTML = `<p>Artisan ID not provided!</p>`;
      return;
    }

    // Fetch artisan data from Firebase
    const artisanRef = ref(database, 'artisans/' + artisanId);
    const snapshot = await get(artisanRef);
    const artisan = snapshot.val();

    if (artisan) {
      displayArtisan(artisan);
    } else {
      document.getElementById('artisan-details').innerHTML = `<p>Artisan not found!</p>`;
    }
  } catch (error) {
    document.getElementById('artisan-details').innerHTML = `<p>Error fetching artisan details: ${error.message}</p>`;
    console.error("Error fetching artisan details:", error);
  }
}

// Function to display the artisan data
function displayArtisan(artisan) {
  const artisanDetails = document.getElementById('artisan-details');

  // Create the HTML structure
  const artisanHeader = document.createElement('header');
  artisanHeader.classList.add('mb-8');

  const artisanName = document.createElement('h1');
  artisanName.classList.add('text-5xl', 'font-bold', 'mb-4', 'text-center');
  artisanName.textContent = artisan.name;

  const artisanPhoto = document.createElement('img');
  artisanPhoto.src = artisan.photo;
  artisanPhoto.alt = artisan.name;
  artisanPhoto.classList.add('w-full', 'h-auto', 'rounded-lg', 'mb-4');

  artisanHeader.appendChild(artisanName);
  artisanHeader.appendChild(artisanPhoto);

  // Article content
  const articleContent = document.createElement('div');
  articleContent.classList.add('prose', 'mx-auto');
  articleContent.innerHTML = artisan.article.content.replace(/\n/g, '<br><br>');

  // Append to the artisan details
  artisanDetails.appendChild(artisanHeader);
  artisanDetails.appendChild(articleContent);
}

// Call the function to load artisan details
loadArtisanDetails();
