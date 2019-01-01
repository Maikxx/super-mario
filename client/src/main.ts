import './scss/index.scss'
import { loadBackgroundSprites } from './ts/sprites'
import { levels } from './ts/levels'
import { Compositor } from './ts/Classes/Compositor'
import { createMario } from './ts/entities'
import { createBackgroundLayer, createSpriteLayer } from './ts/layers'
import { Timer } from './ts/Classes/Timer'
import { KeyboardState } from './ts/Classes/KeyboardState'

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

    // Interaction
    const SPACEBAR = 32
    const input = new KeyboardState()
    input.addMapping(SPACEBAR, (keyState: number) => {
        if (keyState) {
            mario.jump.start()
        } else {
            mario.jump.cancel()
        }
    })
    input.listenTo(window)

    const spriteLayer = createSpriteLayer(mario)
    compositor.layers.push(spriteLayer)

    compositor.draw(context)
    // // Timer
    const timer = new Timer(1 / 60)
    timer.update = (deltaTime: number) => {
        mario.update(deltaTime)
        compositor.draw(context)
        mario.velocity.x = mario.position.x
        mario.velocity.y += gravity
    }
    timer.start()
})()
