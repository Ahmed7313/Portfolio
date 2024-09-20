// artisans/js/artisan.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  // Your Firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get the artisan ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const artisanId = urlParams.get('id');

if (artisanId) {
  // Fetch artisan data from Firebase
  get(child(ref(db), `artisans/${artisanId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const artisan = snapshot.val();
        displayArtisan(artisan);
      } else {
        console.error('No data available for this artisan.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error('No artisan ID provided in the URL.');
}

// Function to display the artisan data
function displayArtisan(artisan) {
  const article = document.getElementById('artisan-article');

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
  articleContent.classList.add('article-content');
  articleContent.innerHTML = artisan.article.content.replace(/\n/g, '<br><br>');

  // Append to the article
  article.appendChild(artisanHeader);
  article.appendChild(articleContent);
}
