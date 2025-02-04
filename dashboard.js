// Load and display saved links from storage
function loadSavedLinks() {
  chrome.storage.local.get("links", (result) => {
    const links = result.links || [];
    const linkContainer = document.getElementById("linkContainer");
    linkContainer.innerHTML = "";

    if (links.length === 0) {
      linkContainer.innerHTML = "<p>No saved links yet!</p>";
    } else {
      links.forEach((link, index) => {
        const linkCard = document.createElement("div");
        linkCard.className = "link-card";
        linkCard.innerHTML = `
                  <a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>
                  <button class="remove" data-index="${index}">Remove</button>
              `;
        linkContainer.appendChild(linkCard);
      });
    }
  });
}

// Listen for clicks on the remove buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("data-index");
    chrome.storage.local.get("links", (result) => {
      const links = result.links || [];
      links.splice(index, 1);
      chrome.storage.local.set({ links }, loadSavedLinks);
    });
  }
});

// Load links when the dashboard page loads
document.addEventListener("DOMContentLoaded", loadSavedLinks);
