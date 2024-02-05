(() => {

  const bodyText = document.body.innerText
  chrome.storage.local.set({ bodyText })
  
})();
