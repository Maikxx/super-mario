import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { Entity } from '../Classes/Entity'
import { PendulumWalk } from '../Traits/PendulumWalk'

export const loadKoopa = async () => {
    const sprite = await loadSpriteSheet('koopa')
    return createKoopaFactory(sprite)
}

const createKoopaFactory = (sprite: SpriteSheet) => {
    const walkAnimation = sprite.animations.get('walk')

    const drawKoopa = (context: CanvasRenderingContext2D, koopa: Entity) => {
        if (!walkAnimation) {
            return
        }

        sprite.draw(walkAnimation(koopa.lifetime), context, 0, 0, koopa.velocity.x < 0)
    }

    return () => {
        const koopa = new Entity()
        koopa.size.set(16, 16)
        koopa.offset.y = 8

        koopa.addTrait(new PendulumWalk())

        koopa.draw = (context: CanvasRenderingContext2D) => drawKoopa(context, koopa)

        return koopa
    }
}
