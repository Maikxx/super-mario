import './scss/index.scss'
import TilesImage from '../public/assets/tiles.png'
import { SpriteSheet } from './ts/SpriteSheet'
import { loadImage, loadLevels } from './ts/loaders'
import { drawBackground } from './ts/draw'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

; (async() => {
    const image = await loadImage(TilesImage)
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('ground', 0, 0)
    sprites.define('sky', 3, 23)

    const levels = loadLevels()
    const levelOne = levels.levelOne
    levelOne.backgrounds.forEach(background => {
        drawBackground(background, context, sprites)
    })
})()
