import './scss/index.scss'
import { loadBackgroundSprites } from './ts/sprites'
import { levels } from './ts/levels'
import { Compositor } from './ts/Classes/Compositor'
import { createMario } from './ts/entities'
import { createBackgroundLayer, createSpriteLayer } from './ts/layers'
import { Timer } from './ts/Classes/Timer'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const { levelOne } = levels
    const [ mario, backgroundSprites ] = await Promise.all([
        createMario(),
        loadBackgroundSprites(),
    ])

    // Compositor
    const compositor = new Compositor()

    const backgroundLayer = createBackgroundLayer(levelOne.backgrounds, backgroundSprites)
    compositor.layers.push(backgroundLayer)

    // Mario
    const gravity = 30
    mario.position.set(64, 180)
    mario.velocity.set(200, -600)

    const spriteLayer = createSpriteLayer(mario)
    compositor.layers.push(spriteLayer)

    // Timer
    const timer = new Timer(1 / 60)
    timer.update = (deltaTime: number) => {
        compositor.draw(context)
        mario.update(deltaTime)
        mario.velocity.y += gravity
    }
    timer.start()
})()
