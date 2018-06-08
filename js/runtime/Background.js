// 背景类
import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';

export class Background extends Sprite{
  constructor () {
    const image = Sprite.getImage('background')
    super (image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)
  }

  draw () {
    super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y, DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height)
  }
}