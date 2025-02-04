// DOM Elements
const linkInput = document.getElementById("linkInput");
const saveLinkButton = document.getElementById("saveLink");
const dashboardButton = document.getElementById("dashboardButton");

// Save a new link to storage
saveLinkButton.addEventListener("click", () => {
  const link = linkInput.value.trim();
  if (link) {
    chrome.storage.local.get("links", (result) => {
      const links = result.links || [];
      links.push(link);
      chrome.storage.local.set({ links }, () => {
        alert("Link saved!");
        linkInput.value = "";
      });
    });
  }
});

// Go to the dashboard page
dashboardButton.addEventListener("click", () => {
  const dashboardUrl = chrome.runtime.getURL("dashboard.html");
  chrome.tabs.create({ url: dashboardUrl });
});
