import './scss/index.scss'
import TilesImage from '../public/assets/tiles.png'
import { SpriteSheet } from './ts/SpriteSheet'
import { loadImage } from './ts/loaders'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

; (async() => {
    const image = await loadImage(TilesImage)
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('ground', 0, 0)
    sprites.draw('ground', context, 45, 62)
})()
