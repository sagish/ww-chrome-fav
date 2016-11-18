// define url conditions to indicate visiting a wework city location
window.CONFIG = {
  cityURLRegex: (/l\/(.+)/i),
  cityNameRegex: (/In(.+)\|/),
  storageKey: 'cities',
  popup: {
    notYet: "You haven't marked any WeWork city as a favorite yet :("
  },
  btn: {
    id: 'wework-fav-btn',
    on: {
      klass: 'fav_on',
      text: 'Save'
    },
    off: {
      klass: 'fav_off',
      text: 'Remove'
    }
  }
}