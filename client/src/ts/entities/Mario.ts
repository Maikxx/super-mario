import { Entity } from '../Classes/Entity'
import { Jump } from '../Traits/Jump'
import { Run } from '../Traits/Run'
import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'

const SLOW_DRAG = 1 / 1000
const FAST_DRAG = 1 / 5000

const createMarioFactory = (sprite: SpriteSheet) => {
    const runAnimation = sprite.animations.get('run')

    const routeFrame = (mario: Entity) => {
        if (mario.jump.falling) {
            return 'jump'
        }

        if (mario.run.distance > 0) {
            if ((mario.velocity.x > 0 && mario.run.direction < 0) || (mario.velocity.x < 0 && mario.run.direction > 0)) {
                return 'break'
            }

            if (runAnimation) {
                return runAnimation(mario.run.distance)
            }
        }

        return 'idle'
    }

    const setTurboState = (turboOn: number, mario: Entity) => {
        mario.run.dragFactor = turboOn
            ? FAST_DRAG
            : SLOW_DRAG
    }

    const drawMario = (context: CanvasRenderingContext2D, mario: Entity) => {
        sprite.draw(routeFrame(mario), context, 0, 0, mario.run.heading < 0)
    }

    return () => {
        const mario = new Entity()

        mario.size.set(14, 16)

        mario.addTrait(new Run())
        mario.addTrait(new Jump())

        mario.turbo = (turboOn: number) => setTurboState(turboOn, mario)
        mario.draw = (context: CanvasRenderingContext2D) => drawMario(context, mario)

        mario.turbo(0)

        return mario
    }
}

export const loadMario = async () => {
    const sprite = await loadSpriteSheet('mario')

    return createMarioFactory(sprite)
}
