// 不断向左移动的陆地
import {Sprite} from '../base/Sprite.js';
import {Director} from '../Director.js';
import {DataStore} from '../base/DataStore.js';

export class Land extends Sprite {
  constructor () {
    const image = Sprite.getImage('land')
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)
    this.landX = 0
    this.landSpeed = 2
    this.canvas = DataStore.getInstance().canvas
    this.y = this.canvas.height - this.srcH
  }

  draw () {
    this.landX += this.landSpeed
    if (this.landX >= this.img.width - this.canvas.width) {
      this.landX = 0
    }
    super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH, -this.landX, this.y, this.width, this.height)
  }
}