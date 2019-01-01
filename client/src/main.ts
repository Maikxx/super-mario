import './scss/index.scss'
import { loadBackgroundSprites } from './ts/sprites'
import { levels } from './ts/levels'
import { Compositor } from './ts/Compositor'
import { createMario } from './ts/entities'
import { createBackgroundLayer, createSpriteLayer } from './ts/layers'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    const { levelOne } = levels
    const [ mario, backgroundSprites ] = await Promise.all([
        createMario(),
        loadBackgroundSprites(),
    ])

    const compositor = new Compositor()
    const backgroundLayer = createBackgroundLayer(levelOne.backgrounds, backgroundSprites)
    compositor.layers.push(backgroundLayer)

    const gravity = 0.5

    const spriteLayer = createSpriteLayer(mario)
    compositor.layers.push(spriteLayer)

    const update = () => {
        compositor.draw(context)
        mario.update()
        mario.velocity.y += gravity
        requestAnimationFrame(update)
    }

    update()
})()
