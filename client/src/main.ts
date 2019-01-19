import './scss/index.scss'
import { Timer } from './ts/Classes/Timer'
import { setupInputHandler } from './ts/input'
import { Camera } from './ts/Classes/Camera'
import { createLevelLoader } from './ts/loaders/levelLoader'
import { loadEntities } from './ts/entities'
import { Entity } from './ts/Classes/Entity'
import { PlayerController } from './ts/Traits/PlayerController'
import { createCollisionLayer } from './ts/layers/CollisionLayer'
import { loadFont } from './ts/loaders/fontLoader'
import { createDashboardLayer } from './ts/layers/dashboardLayer'

const createPlayerEnvironment = (playerEntity: Entity) => {
    const playerEnvironment = new Entity()
    const playerControl = new PlayerController()

    playerControl.setPlayer(playerEntity)
    playerControl.checkPoint.set(64, 64)
    playerEnvironment.addTrait(playerControl)

    return playerEnvironment
}

const canvas = document.getElementById('screen') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

(async() => {
    // Initializers
    const camera = new Camera()
    const [ entityFactory, font ] = await Promise.all([ loadEntities(), loadFont() ])
    const loadLevel = await createLevelLoader(entityFactory)
    const level = await loadLevel('1-1')

    const mario = entityFactory.mario()

    // Mario
    const playerEnvironment = createPlayerEnvironment(mario)
    level.entities.add(playerEnvironment)
    level.composition.layers.push(createCollisionLayer(level), createDashboardLayer(font, playerEnvironment))

    // Interaction
    const input = setupInputHandler(mario)
    input.listenTo(window)

    const timer = new Timer(1 / 60)
    timer.update = (deltaTime: number) => {
        level.update(deltaTime)

        camera.position.x = Math.max(0, mario.position.x - 100)

        level.composition.draw(context, camera)
    }
    timer.start()
})()
