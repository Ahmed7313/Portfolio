// js/insights.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

async function loadInsights() {
  try {
    const insightsRef = ref(database, "insights");
    const snapshot = await get(insightsRef);

    if (snapshot.exists()) {
      const insights = snapshot.val();
      const insightsList = document.getElementById('insights-list');

      for (let key in insights) {
        const insight = insights[key];

        const insightItem = document.createElement('div');
        insightItem.className = 'insight-item flex flex-col md:flex-row';

        insightItem.innerHTML = `
          <img src="${insight.image}" alt="${insight.title}" class="w-full md:w-1/3 h-64 object-cover">
          <div class="insight-content md:w-2/3">
            <h3 class="insight-title">${insight.title}</h3>
            <p class="insight-text">${insight.content.substring(0, 200)}...</p>
          </div>
        `;
        insightsList.appendChild(insightItem);
      }
    } else {
      console.log("No cultural insights found in the database.");
    }
  } catch (error) {
    console.error("Error fetching insights:", error);
  }
}

export { loadInsights };
