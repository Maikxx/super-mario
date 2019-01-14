import './scss/index.scss'
import { Timer } from './ts/Classes/Timer'
import { setupInputHandler } from './ts/input'
import { Camera } from './ts/Classes/Camera'
import { loadLevel } from './ts/loaders/levelLoader'
import { createCollisionLayer } from './ts/layers'
import { loadEntities } from './ts/entities'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const camera = new Camera()
    const [ entity, level ] = await Promise.all([
        loadEntities(),
        loadLevel('1-1', camera),
    ])

    console.log(entity)
    const mario = entity.mario()
    level.entities.add(mario)

    const goomba = entity.goomba()
    goomba.position.x = 220
    level.entities.add(goomba)

    const koopa = entity.koopa()
    koopa.position.x = 260
    level.entities.add(koopa)

    // Mario
    mario.position.set(64, 64)

    level.composition.layers.push(createCollisionLayer(level))

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
