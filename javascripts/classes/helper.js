class Helper {
  static getURL() {
    return location.href
  }

  static getCityFromSource() {
    let matches = this.getURL().match(CONFIG.cityURLRegex);
    let city = false;
    if (matches && matches[1] && document.title && document.title.match(CONFIG.cityNameRegex)) {
      city = document.title.match(/In(.+)\|/)[1].trim()
    }
    return city;
  }
}