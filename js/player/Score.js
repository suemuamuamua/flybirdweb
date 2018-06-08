// 计分器类
import {DataStore} from '../base/DataStore.js';

export class Score {
  constructor () {
    this.isScore = true
    this.scoreNum = 0
    this.ctx = DataStore.getInstance().ctx
  }

  draw () {
    this.ctx.font = '28px Arial'
    this.ctx.fillStyle = '#FF4500'
    this.ctx.fillText(this.scoreNum, DataStore.getInstance().canvas.width / 2.2, DataStore.getInstance().canvas.height / 20)
  }
}