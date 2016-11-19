class DB {
  constructor(obj) {
    this._className = this.constructor.name
    this._storageKey = MODELS[this._className]['storageKey']
    for (let k of (Object.keys(MODELS[this._className] || {}))) {
      this['_' + MODELS[this._className][k]] = obj[MODELS[this._className][k]]
    }
  }

  _set(save) {
    return new Promise((resolve, reject) => {
      try {
        this.constructor.findAll(true).then((data) => {
          if (save) {
            data[this[MODELS[this._className]['key']]] = this[MODELS[this._className]['value']]
          }
          else {
            delete data[this[MODELS[this._className]['key']]]  
          }
          chrome.storage.local.set({[MODELS[this._className]['storageKey']]: data}, () => {
            resolve()
          })
        });
      }
      catch (e) {
        reject(e)
      }
    }) 
  }

  save() {
    console.log(this._className, 'save:', this['_' + MODELS[this._className]['key']])
    return this._set(true);
  }

  remove() {
    console.log(this._className, 'remove:', this['_' + MODELS[this._className]['key']])
    return this._set(false);
  }

  static find(key) {
    return new Promise ((resolve, reject) => {
      this.findAll(true).then((data) => {
        if (data[key]) {
          let o = new this({
            [MODELS[this.name]['key']]: key, 
            [MODELS[this.name]['value']]: data[key]
          })
          return resolve(o)
        }
        return resolve(false);
      })
    })
  }

  static findAll(raw=false) {
    return new Promise ((resolve, reject) => {
      var storageKey = MODELS[this.name]['storageKey']

      try {
        chrome.storage.local.get(storageKey, ((db) => {
          let data = (db[storageKey] || {});
          if (raw) return resolve(data); // return raw
          let results = []
          for (let key of Object.keys(data)) {
            let o = {
              [MODELS[this.name]['key']]: key, 
              [MODELS[this.name]['value']]: data[key]
            }
            results.push(new this(o))
          }
          resolve(results);
        }));
      } 
      catch (e) {
        reject(e);
      }
    })
  }
}