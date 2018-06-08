// 资源文件加载器，确保canvas在图片资源加载完成之后才进行渲染
import {Resources} from './Resources.js';

export class ResourceLoader {
  constructor () {
    this.map = new Map(Resources)
    // 将图片资源路径数组转换成image对象数组
    for (let [key, value] of this.map) {
      const image = new Image()
      image.src = value
      this.map.set(key, image)
    }
  }

  onLoaded (callback) {
    // 判断资源是否加载完成，完成后再执行回调函数callback
    let loadedCount = 0
    console.log(this.map.values())
    for (let value of this.map.values()) {
      console.log(value)
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

  static create () {
    return new ResourceLoader()
  }
}