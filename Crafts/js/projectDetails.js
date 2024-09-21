// js/projectDetails.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Function to get query parameter by name
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Variable to store project data
let project = null;

// Function to load project details
async function loadProjectDetails() {
  try {
    // Get the project ID from the URL
    const projectId = getParameterByName('id');

    if (!projectId) {
      document.getElementById('project-additional').innerHTML = '<p>Project ID not provided!</p>';
      return;
    }

    // Fetch project data from Firebase
    const projectRef = ref(database, 'projects/' + projectId);
    const snapshot = await get(projectRef);
    project = snapshot.val();

    if (project) {
      // Populate the page with project details and video
      document.getElementById('project-video').src = project.video;
      document.getElementById('project-title').innerText = project.title;
      document.getElementById('project-additional').innerHTML = project.content;

      // Populate contact info
      document.getElementById('artist-name').innerText = project.contact.name;
      document.getElementById('artist-email').innerText = project.contact.email;
      document.getElementById('artist-phone').innerText = project.contact.phone;

      // Initialize the map
      initMap();

      // Initialize collapsible card behavior
      initializeCollapsibleCard();
    } else {
      document.getElementById('project-additional').innerHTML = '<p>Project not found!</p>';
    }
  } catch (error) {
    document.getElementById('project-additional').innerHTML = '<p>Error fetching project details: ' + error.message + '</p>';
    console.error("Error fetching project details:", error);
  }
}

// Function to initialize the embedded Google Map without an API key
function initMap() {
  const mapIframe = document.getElementById('map');
  // Set the default location to Cairo, Egypt
  let location = 'Cairo, Egypt';

  // If project has a location, use it
  if (project.location && project.location.lat && project.location.lng) {
    location = `${project.location.lat},${project.location.lng}`;
  }

  // Generate the Google Maps embed URL without an API key
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

  // Set the src of the iframe
  mapIframe.src = embedUrl;
}

// Function to initialize collapsible card behavior
function initializeCollapsibleCard() {
  const collapsibleCard = document.getElementById('collapsible-card');
  const additionalInfoParagraph = document.getElementById('project-additional');
  const toggleButton = document.getElementById('toggle-button');
  let isExpanded = false;

  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isExpanded) {
      additionalInfoParagraph.classList.remove('expanded-content');
      additionalInfoParagraph.classList.add('collapsed-content');
      toggleButton.textContent = 'Read More';
    } else {
      additionalInfoParagraph.classList.remove('collapsed-content');
      additionalInfoParagraph.classList.add('expanded-content');
      toggleButton.textContent = 'Read Less';
    }
    isExpanded = !isExpanded;
  });

  collapsibleCard.addEventListener('click', () => {
    toggleButton.click();
  });
}

// Call the function to load project details after the window loads
window.onload = loadProjectDetails;
