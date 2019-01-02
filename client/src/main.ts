import './scss/index.scss'
import { createMario } from './ts/entities'
import { Timer } from './ts/Classes/Timer'
import { loadLevel } from './ts/loaders'
import { debugCollision } from './ts/debug'
import { setupInputHandler } from './ts/input'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const [ mario, level ] = await Promise.all([
        createMario(),
        loadLevel('levelOne'),
    ])

    level.entities.add(mario)

    debugCollision(canvas, mario)

    // Mario
    const gravity = 2000
    mario.position.set(64, 180)

    // Interaction
    const input = setupInputHandler(mario)
    input.listenTo(window)

    const timer = new Timer(1 / 60)
    timer.update = (deltaTime: number) => {
        level.update(deltaTime)
        level.composition.draw(context)
        mario.velocity.y += (gravity * deltaTime)
    }
    timer.start()
})()
