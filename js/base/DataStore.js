// 变量缓存器，方便在不同的类中访问和修改变量
export class DataStore {
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor () {
    this.map = new Map()
  }

  get (key) {
    return this.map.get(key)
  }

  put(key, value) {
    // value传入的类即为function
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this
  }

  destroy () {
    for (let value of this.map.values()) {
      value = null
    }
  }
}