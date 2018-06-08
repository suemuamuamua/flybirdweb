//小游戏入口
import {ResourceLoader} from './js/base/ResourceLoader.js';
import {Director} from './js/Director.js';
import {DataStore} from './js/base/DataStore.js';
import {Background} from './js/runtime/Background.js';
import {Land} from './js/runtime/Land.js';
import {Birds} from './js/player/Birds.js'; 
import {StartButton} from './js/player/StartButton.js';
import {Score} from './js/player/Score.js';

export class Main {
  constructor () {
    this.canvas = document.getElementById('game_canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    const loader = ResourceLoader.create()
    // 资源加载完成后执行onResourcesFirstLoaded
    loader.onLoaded(map => {
      this.onResourcesFirstLoaded(map)
    })
  }

  onResourcesFirstLoaded (map) {
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init () {
    console.log('游戏开始啦')
    this.director.isGameOver = false
    this.dataStore.put('pencils', [])
                  .put('background', Background)
                  .put('land', Land)
                  .put('birds', Birds)
                  .put('startButton', StartButton)
                  .put('score', Score)
    this.registerEvent()
    // 在游戏开始前创建铅笔
    this.director.createPencil()
    this.director.run()
  }

  registerEvent () {
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      if (this.director.isGameOver) {
        console.log('游戏重新开始')
        this.init()
      } else {
        this.dataStore.get('birds').time = 0
      }
    })
  }
}