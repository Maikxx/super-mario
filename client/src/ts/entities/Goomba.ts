import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { Entity, Sides } from '../Classes/Entity'

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

        goomba.addTrait({
            NAME: 'walk',
            obstruct: (goomba, side) => {
                if (side === Sides.LEFT || side === Sides.RIGHT) {
                    goomba.velocity.x = -goomba.velocity.x
                }
            },
            update: (goomba, deltaTime) => {
                goomba.lifetime += deltaTime
                goomba.velocity.x = -30
            },
        })

        goomba.draw = (context: CanvasRenderingContext2D) => drawGoomba(context, goomba)

        return goomba
    }
}
