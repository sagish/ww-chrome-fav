{
  let favorite;
  let title;
  let url = Helper.getURL();

  let $body = document.body;
  let $button = document.createElement("button");
  $button.id = CONFIG.btn.id;
  $body.appendChild($button);

  function updateButton() {
    if (!title) return $button.className = null
    City
      .find(title)
      .then(exists => {
        $button.className = exists ? CONFIG.btn.on.klass : CONFIG.btn.off.klass
      })
      .catch(HandleError)
  }

  $button.addEventListener("click", () => {
    City
      .find(title)
      .then(city => {
        if (city) return city.remove().then(updateButton).catch(HandleError)
        new City({title, url}).save().then(updateButton).catch(HandleError)
      })
      .catch(HandleError)
  }, false)

  // quirky observer - chrome.tabs in unvailable in content scripts nor window.onpopstate and other history events
  setInterval(() => {
    if (Helper.getCityFromSource()) {
      if (title !== Helper.getCityFromSource()) {
        // move from non-city to city page
        title = Helper.getCityFromSource();
        updateButton()
      }
    }
    else if (title) {
      // move from city to non-city page, hide button
      title = null;
      updateButton();
    }
  }, 100);

}