import './scss/index.scss'
import { Timer } from './ts/Classes/Timer'
import { setupInputHandler } from './ts/input'
import { Camera } from './ts/Classes/Camera'
import { createLevelLoader } from './ts/loaders/levelLoader'
import { createCollisionLayer } from './ts/layers'
import { loadEntities } from './ts/entities'

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const camera = new Camera()
    const entityFactory = await loadEntities()
    const loadLevel = await createLevelLoader(entityFactory)
    const level = await loadLevel('1-1')

    const mario = entityFactory.mario()
    level.entities.add(mario)

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
