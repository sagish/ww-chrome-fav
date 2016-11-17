(function(){
  var favorite;
  var city;
  var url = location.href;

  var $body = document.body;
  var $button = document.createElement("button");
  $button.id = window.CONFIG.btn.id;
  $body.appendChild($button);

  function updateButton() {
    // console.log("updateButton", favorite);
    $button.className = city ? (favorite ? window.CONFIG.btn.on.klass : window.CONFIG.btn.off.klass) : '';
  }

  $button.addEventListener("click", function() {
    isFavorite(city, function(is) {
      favorite = !is; // toggle
      setFavorite(city, favorite); // set new state
      updateButton(); // update button
    });
  }, false);

  // quirky observer - chrome.tabs in unvailable in content scripts nor window.onpopstate and other history events
  setInterval(function(){
    if (getCity()) {
      if (city !== getCity()) {
        // move from non-city to city page
        city = getCity();
        isFavorite(city, function(is){
          favorite = is;
          updateButton();
        });
      }
    }
    else if (city) {
      // move from city to non-city page, hide button
      city = null;
      updateButton();
    }
  }, 10);

})();