// 开始按钮类
import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';

export class StartButton extends Sprite {
  constructor () {
    const image = Sprite.getImage('startButton')
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)
  }

  draw () {
    super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH, (DataStore.getInstance().canvas.width- this.width) / 2, (DataStore.getInstance().canvas.height - this.height) / 2.5, this.width, this.height)
  }
}