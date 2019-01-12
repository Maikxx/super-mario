import { Entity } from './Classes/Entity'
import { Jump } from './Traits/Jump'
import { Run } from './Traits/Run'
import { loadSpriteSheet } from './loaders'
import { createAnimation } from './animation'

const SLOW_DRAG = 1 / 1000
const FAST_DRAG = 1 / 5000

export const createMario = async () => {
    const sprite = await loadSpriteSheet('mario')
    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Run())
    mario.addTrait(new Jump())

    mario.run.dragFactor = SLOW_DRAG

    mario.turbo = (turboOn: number) => {
        mario.run.dragFactor = turboOn
            ? FAST_DRAG
            : SLOW_DRAG
    }

    const runAnimation = createAnimation([ 'run-1', 'run-2', 'run-3' ], 6)
    const routeFrame = (mario: Entity) => {
        if (mario.jump.falling) {
            return 'jump'
        }

        if (mario.run.distance > 0) {
            if ((mario.velocity.x > 0 && mario.run.direction < 0) || (mario.velocity.x < 0 && mario.run.direction > 0)) {
                return 'break'
            }

            return runAnimation(mario.run.distance)
        }

        return 'idle'
    }

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw(routeFrame(mario), context, 0, 0, mario.run.heading < 0)
    }

    return mario
}
