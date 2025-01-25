// DOM Elements
const linkInput = document.getElementById("linkInput");
const saveLinkButton = document.getElementById("saveLink");
const linkList = document.getElementById("linkList");
const dashboardButton = document.getElementById("dashboardButton");

// Load saved links from storage on startup
function loadLinks() {
  chrome.storage.local.get("links", (result) => {
    const links = result.links || [];
    linkList.innerHTML = "";
    links.forEach((link, index) => {
      addLinkToDOM(link, index);
    });
  });
}

// Save a new link
saveLinkButton.addEventListener("click", () => {
  const link = linkInput.value.trim();
  if (link) {
    chrome.storage.local.get("links", (result) => {
      const links = result.links || [];
      links.push(link);
      chrome.storage.local.set({ links }, () => {
        alert("Link saved!");
        addLinkToDOM(link, links.length - 1);
        linkInput.value = "";
      });
    });
  }
});

// Add a link to the DOM
function addLinkToDOM(link, index) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${link}</span> <span class="remove" data-index="${index}">Remove</span>`;
  linkList.appendChild(li);
}

// Remove a link
linkList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("data-index");
    chrome.storage.local.get("links", (result) => {
      const links = result.links || [];
      links.splice(index, 1);
      chrome.storage.local.set({ links }, loadLinks);
    });
  }
});

// Redirect to dashboard
dashboardButton.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// Initial load
loadLinks();
