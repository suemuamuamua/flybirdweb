// 铅笔基类
import {Sprite} from '../base/Sprite.js';
import {Director} from '../Director.js';
import {DataStore} from '../base/DataStore.js';

export class Pencil extends Sprite {
  /**
  *top 上铅笔底部的top
  */
  constructor (image, top) {
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)
    this.top = top
    this.moveSpeed = 2
    this.x = DataStore.getInstance().canvas.width
  }

  draw () {
    this.x -= this.moveSpeed
    super.draw(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}