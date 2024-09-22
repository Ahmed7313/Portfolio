// js/insightDetails.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Function to get query parameter by name
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Function to load insight details
async function loadInsightDetails() {
  try {
    // Get the insight ID from the URL
    const insightId = getParameterByName('id');

    if (!insightId) {
      document.getElementById('insight-content').innerHTML = '<p class="text-center text-red-500">Insight ID not provided!</p>';
      return;
    }

    // Fetch insight data from Firebase
    const insightRef = ref(database, 'insights/' + insightId);
    const snapshot = await get(insightRef);
    const insight = snapshot.val();

    if (insight) {
      // Set header image and title
      const headerSection = document.getElementById('insight-header');
      headerSection.style.backgroundImage = `url('${insight.image}')`;
      headerSection.style.backgroundSize = 'cover';
      headerSection.style.backgroundPosition = 'center';
      document.getElementById('insight-title').innerText = insight.title;

      // Populate the page with insight content
      document.getElementById('insight-content').innerHTML = insight.content;
    } else {
      document.getElementById('insight-content').innerHTML = '<p class="text-center text-gray-500">Insight not found!</p>';
    }
  } catch (error) {
    document.getElementById('insight-content').innerHTML = `<p class="text-center text-red-500">Error fetching insight details: ${error.message}</p>`;
    console.error("Error fetching insight details:", error);
  }
}

// Call the function to load insight details after the window loads
window.onload = loadInsightDetails;
