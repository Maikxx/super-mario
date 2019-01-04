import { Entity } from './Classes/Entity'
import { Jump } from './Traits/Jump'
import { Run } from './Traits/Run'
import { loadSpriteSheet } from './loaders'
import { createAnimation } from './animation'

export const createMario = async () => {
    const sprite = await loadSpriteSheet('mario')
    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Run())
    mario.addTrait(new Jump())

    const runAnimation = createAnimation([ 'run-1', 'run-2', 'run-3' ], 10)
    const routeFrame = (mario: Entity) => {
        if (mario.run.direction !== 0) {
            return runAnimation(mario.run.distance)
        }

        return 'idle'
    }

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw(routeFrame(mario), context, 0, 0, mario.run.heading < 0)
    }

    return mario
}
