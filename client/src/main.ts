import './scss/index.scss'
import { loadBackgroundSprites, loadMarioSprite } from './ts/sprites'
import { levels } from './ts/levels'
import { Compositor } from './ts/Compositor'
import { createBackgroundLayer, createSpriteLayer } from './ts/layers'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    const { levelOne } = levels
    const [ backgroundSprites, marioSprite ] = await Promise.all([
        loadBackgroundSprites(),
        loadMarioSprite(),
    ])

    const compositor = new Compositor()
    const backgroundLayer = createBackgroundLayer(levelOne.backgrounds, backgroundSprites)
    compositor.layers.push(backgroundLayer)

    const position = {
        x: 64,
        y: 64,
    }

    const spriteLayer = createSpriteLayer(marioSprite, position)
    compositor.layers.push(spriteLayer)

    const update = () => {
        compositor.draw(context)
        position.x += 2
        position.y += 2
        requestAnimationFrame(update)
    }

    update()
})()
