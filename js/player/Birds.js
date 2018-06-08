import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';

export class Birds extends Sprite {
  constructor () {
    const image = Sprite.getImage('birds')
    super(image, 0, 0, image.width / 3, image.height, 0, 0, image.width / 3, image.height)
    //小鸟高度24，宽度34，左右边距9，上下边距10
    const birdWidth = 34
    const birdHeight = 24
    const marginLeft = 9
    const marginTop = 10
    this.canvas = DataStore.getInstance().canvas
    this.clipX = [marginLeft, birdWidth + marginLeft * 3, birdWidth * 2 + marginLeft * 5]// 小鸟剪裁X坐标
    this.clipY = marginTop// 小鸟剪裁Y坐标
    this.clipWidth = birdWidth// 小鸟剪裁的宽度
    this.clipHeight = birdHeight// 小鸟剪裁的高度
    this.birdsX = this.canvas.width / 4 //小鸟X坐标
    this.birdsY = this.canvas.height / 2.5//小鸟Y坐标
    this.birdsWidth = birdWidth// 小鸟使用的宽度
    this.birdsHeight = birdHeight// 小鸟使用的高度
    this.index = 0
    this.count = 0
    this.time = 0
  }

  draw () {
    const speed = 0.2
    this.count += speed
    // 视频教程中this.index为2便重置this.count，但这样使得小鸟图片3仅显示一帧
    if (this.index >= 2 && this.count >= 3) {
      this.count = 0
    }
    this.index = Math.floor(this.count)
    // 小鸟自由落体运动
    // 重力加速度
    const g = 0.98 / 10
    // 小鸟向上偏移位移
    const offestUp = 12
    // 小鸟的位移 s = v0 * t + (a * t * t) / 2
    const offestY = (g * this.time * (this.time - offestUp)) / 2
    // for (let i = 0; i < this.birdsY.length; i++) {
    //   this.birdsY[i] += offestY
    // }
    this.birdsY += offestY
    this.time++

    super.draw(this.img, this.clipX[this.index], this.clipY, this.clipWidth, this.clipHeight, this.birdsX, this.birdsY, this.birdsWidth, this.birdsHeight)
  }
}