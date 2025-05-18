document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const statusEl = document.getElementById('status');
    const highlightToggle = document.getElementById('highlightToggle');
  
    // Load saved settings
    chrome.storage.local.get(['highlightEnabled'], (result) => {
      highlightToggle.checked = result.highlightEnabled !== false;
    });
  
    // Save settings when changed
    highlightToggle.addEventListener('change', (e) => {
      chrome.storage.local.set({ highlightEnabled: e.target.checked });
    });
  
    // Analyze button handler
    analyzeBtn.addEventListener('click', async () => {
      statusEl.textContent = "Analyzing...";
      
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Verify content script is ready
        try {
          await chrome.tabs.sendMessage(tab.id, { action: "ping" });
        } catch (e) {
          // If not, inject it
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
        }
  
        // Send analyze request
        const response = await chrome.tabs.sendMessage(tab.id, { action: "analyze" });
        statusEl.textContent = `Analyzed ${response.count} items`;
        
      } catch (error) {
        console.error("Error:", error);
        statusEl.textContent = "Error: " + error.message;
      }
    });
  });