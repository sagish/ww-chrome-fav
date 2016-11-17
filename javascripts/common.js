function getURL() {
  return location.href; 
}

// check if the current tab is a WeWork city page
function getCity() {
  var matches = getURL().match(window.CONFIG.cityURLRegex);
  var city = false;
  if (matches && matches[1]) {
    if (document.title && document.title.match(window.CONFIG.cityNameRegex)) {
      city = document.title.match(/In(.+)\|/)[1].trim()
    }
  }
  return city;
}

// check if a city is marked as favorite
function isFavorite(city, callback) {
  getCities(function(cities){
    callback(!!cities[city]);
  });
}

// update the local db with the new status of a city 
function setFavorite(city, setAsFavorite, callback) {
  getCities(function(cities){
    if (!setAsFavorite && cities[city]) {
      delete cities[city];
    }
    else {
      cities[city] = getURL();
    }
    chrome.storage.local.set({'cities': cities}, callback);
  });
}

function getCities(callback) {
  chrome.storage.local.get('cities', function(db) {
    callback(db.cities || {});
  });
}