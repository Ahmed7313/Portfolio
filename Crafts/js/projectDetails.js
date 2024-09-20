// js/projectDetails.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Function to get query parameter by name
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Function to load project details
async function loadProjectDetails() {
  try {
    // Get the project ID from the URL
    const projectId = getParameterByName('id');

    if (!projectId) {
      document.getElementById('project-additional').innerHTML = `<p>Project ID not provided!</p>`;
      return;
    }

    // Fetch project data from Firebase
    const projectRef = ref(database, 'projects/' + projectId);
    const snapshot = await get(projectRef);
    const project = snapshot.val();

    if (project) {
      // Populate the page with project details and video
      document.getElementById('project-video').src = project.video;
      document.getElementById('project-title').innerText = project.title;
      document.getElementById('project-additional').innerText = project.additionalInfo;

      // Populate contact info
      document.getElementById('artist-name').innerText = project.contact.name;
      document.getElementById('artist-email').innerText = project.contact.email;
      document.getElementById('artist-phone').innerText = project.contact.phone;

      // Initialize collapsible card behavior
      initializeCollapsibleCard();
    } else {
      document.getElementById('project-additional').innerHTML = `<p>Project not found!</p>`;
    }
  } catch (error) {
    document.getElementById('project-additional').innerHTML = `<p>Error fetching project details: ${error.message}</p>`;
    console.error("Error fetching project details:", error);
  }
}

// Function to initialize collapsible card behavior
function initializeCollapsibleCard() {
  const collapsibleCard = document.getElementById('collapsible-card');
  const additionalInfoParagraph = document.getElementById('project-additional');
  let isExpanded = false;

  collapsibleCard.addEventListener('click', () => {
    if (isExpanded) {
      additionalInfoParagraph.classList.remove('expanded-content');
      additionalInfoParagraph.classList.add('collapsed-content');
    } else {
      additionalInfoParagraph.classList.remove('collapsed-content');
      additionalInfoParagraph.classList.add('expanded-content');
    }
    isExpanded = !isExpanded;
  });
}

// Call the function to load project details
loadProjectDetails();
