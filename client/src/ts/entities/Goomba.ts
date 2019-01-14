import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { Entity } from '../Classes/Entity'
import { PendulumWalk } from '../Traits/PendulumWalk'

export const loadGoomba = async () => {
    const sprite = await loadSpriteSheet('goomba')
    return createGoombaFactory(sprite)
}

const createGoombaFactory = (sprite: SpriteSheet) => {
    const walkAnimation = sprite.animations.get('walk')

    const drawGoomba = (context: CanvasRenderingContext2D, goomba: Entity) => {
        if (!walkAnimation) {
            return
        }

        sprite.draw(walkAnimation(goomba.lifetime), context, 0, 0)
    }

    return () => {
        const goomba = new Entity()
        goomba.size.set(16, 16)

        goomba.addTrait(new PendulumWalk())

        goomba.draw = (context: CanvasRenderingContext2D) => drawGoomba(context, goomba)

        return goomba
    }
}
