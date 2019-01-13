import './scss/index.scss'
import { Timer } from './ts/Classes/Timer'
import { setupInputHandler } from './ts/input'
import { Camera } from './ts/Classes/Camera'
import { loadLevel } from './ts/loaders/levelLoader'
import { loadMario } from './ts/entities/Mario'
import { loadGoomba } from './ts/entities/Goomba'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const camera = new Camera()
    const [ createMario, createGoomba, level ] = await Promise.all([
        loadMario(),
        loadGoomba(),
        loadLevel('1-1', camera),
    ])

    const mario = createMario()
    level.entities.add(mario)

    const goomba = createGoomba()
    goomba.position.x = 220
    level.entities.add(goomba)

    // Mario
    mario.position.set(64, 64)

    // Interaction
    const input = setupInputHandler(mario)
    input.listenTo(window)

    const timer = new Timer(1 / 60)
    timer.update = (deltaTime: number) => {
        level.update(deltaTime)

        if (mario.position.x > 100) {
            camera.position.x = mario.position.x - 100
        }

        level.composition.draw(context, camera)
    }
    timer.start()
})()
