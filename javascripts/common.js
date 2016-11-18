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
    var save = {};
    if (!setAsFavorite && cities[city]) {
      delete cities[city];
    }
    else {
      cities[city] = getURL();
    }
    save[window.CONFIG.storageKey] = cities;
    chrome.storage.local.set(save, callback);
  });
}

function getCities(callback) {
  chrome.storage.local.get(window.CONFIG.storageKey, function(db) {
    callback(db[window.CONFIG.storageKey] || {});
  });
}