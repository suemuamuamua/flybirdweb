// 游戏逻辑
import {DataStore} from './base/DataStore.js';
import {UpPencil} from './runtime/UpPencil.js';
import {DownPencil} from './runtime/DownPencil.js';

export class Director {

  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  constructor () {
    this.dataStore = DataStore.getInstance()
  }

  createPencil () {
    let minTop = this.dataStore.canvas.height / 8
    let maxTop = this.dataStore.canvas.height / 2
    let top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  // 碰撞检测及加分逻辑
  check () {
    // 小鸟位置
    const birds = this.dataStore.get('birds')
    const birdsPos = {
      top: birds.birdsY,
      right: birds.birdsX + birds.birdsWidth,
      bottom: birds.birdsY + birds.birdsHeight,
      left: birds.birdsX
    }
    // 小鸟和陆地碰撞检测
    if (birdsPos.bottom >= this.dataStore.get('land').y) {
      this.isGameOver = true
    }
    // 小鸟和铅笔碰撞检测
    const isStrick = (pencilPos) => {
      let flag = false
      if (birdsPos.top > pencilPos.bottom || birdsPos.right < pencilPos.left || birdsPos.bottom < pencilPos.top || birdsPos.left > pencilPos.right) {
        // 当小鸟在安全区域时
        flag = true
      }
      return !flag
    }
    const pencils = this.dataStore.get('pencils')
    pencils.forEach((pencil) => {
      const pencilPos = {
        top: pencil.y,
        right: pencil.x + pencil.width,
        bottom: pencil.y + pencil.height,
        left: pencil.x
      }
      // 每根铅笔与小鸟进行碰撞检测
      if (isStrick(pencilPos)) {
        this.isGameOver = true
      }
    })

    // score计算
    let score = this.dataStore.get('score')
    if (birdsPos.left > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false
      score.scoreNum++ 
    }
  }

  run () {
    this.check()
    if(!this.isGameOver) {
      // 绘制背景
      this.dataStore.get('background').draw()
      // 创建并绘制铅笔
      const pencils = this.dataStore.get('pencils')
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true
      }
      if (pencils[0].x <= (this.dataStore.canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
          this.createPencil()
      }
      this.dataStore.get('pencils').forEach((item) => {
        item.draw()
      })
      // 绘制陆地，不断重绘
      this.dataStore.get('land').draw()
      let timer = requestAnimationFrame(() => {
        this.run()
      })
      // 绘制小鸟
      this.dataStore.get('birds').draw()
      this.dataStore.get('score').draw()
      this.dataStore.put('timer', timer)
    } else {
      this.dataStore.get('startButton').draw()
      console.log('游戏结束')
      this.dataStore.destroy()
    }
  }
}