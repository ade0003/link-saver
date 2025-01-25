// Function to load and display saved links
function loadSavedLinks() {
  chrome.storage.local.get("links", (result) => {
    const links = result.links || [];
    const linkContainer = document.getElementById("linkContainer");
    linkContainer.innerHTML = ""; // Clear container

    if (links.length === 0) {
      linkContainer.innerHTML = "<p>No saved links yet!</p>";
    } else {
      links.forEach((link, index) => {
        const linkCard = document.createElement("div");
        linkCard.className = "link-card";
        linkCard.innerHTML = `
                    <a href="${link}" target="_blank">${link}</a>
                    <button class="remove" data-index="${index}">Remove</button>
                `;
        linkContainer.appendChild(linkCard);
      });
    }
  });
}

// Event listener to handle removal of links
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("data-index");
    chrome.storage.local.get("links", (result) => {
      const links = result.links || [];
      links.splice(index, 1); // Remove link at the specified index
      chrome.storage.local.set({ links }, loadSavedLinks); // Save updated links and reload
    });
  }
});

// Load links when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", loadSavedLinks);
