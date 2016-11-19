class Helper {
  static getURL() {
    return location.href
  }

  static getCityFromSource() {
    var matches = this.getURL().match(CONFIG.cityURLRegex)
    var city = false
    if (matches && matches[1] && document.title && document.title.match(CONFIG.cityNameRegex)) {
      city = document.title.match(/In(.+)\|/)[1].trim()
    }
    return city
  }
}