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
        insightItem.className = 'insight-item flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden';

        insightItem.innerHTML = `
          <a href="insights/insight.html?id=${key}" class="flex flex-col md:flex-row">
            <img src="${insight.image}" alt="${insight.title}" class="w-full md:w-1/3 h-64 object-cover">
            <div class="insight-content md:w-2/3 p-4">
              <h3 class="insight-title text-2xl font-semibold mb-2">${insight.title}</h3>
              <p class="insight-text text-gray-700">${insight.content.substring(0, 200)}...</p>
              <span class="text-blue-500 mt-2 inline-block">Read More</span>
            </div>
          </a>
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
