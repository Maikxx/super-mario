import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { Entity } from '../Classes/Entity'
import { PendulumMove } from '../Traits/PendulumMove'
import { Trait } from '../Classes/Trait'
import { Killable } from '../Traits/Killable'
import { Solid } from '../Traits/Solid'

export const loadGoomba = async () => {
    const sprite = await loadSpriteSheet('goomba')
    return createGoombaFactory(sprite)
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour')
    }

    public collides = (us: Entity, them: Entity) => {
        if (us.killable && us.killable.dead) {
            return
        }

        if (them.stomper) {
            if (them.velocity.y > us.velocity.y) {
                if (us.killable) {
                    us.killable.kill()
                }

                if (us.pendulumMove) {
                    us.pendulumMove.speed = 0
                }
            } else {
                if (them.killable) {
                    them.killable.kill()
                }
            }
        }
    }
}

const createGoombaFactory = (sprite: SpriteSheet) => {
    const walkAnimation = sprite.animations.get('walk')

    const routeAnimation = (goomba: Entity) => {
        if (!walkAnimation) {
            return 'walk-1'
        }

        if (goomba.killable && goomba.killable.dead) {
            return 'flat'
        }

        return walkAnimation(goomba.lifetime)
    }

    const drawGoomba = (context: CanvasRenderingContext2D, goomba: Entity) => {
        if (!walkAnimation) {
            return
        }

        sprite.draw(routeAnimation(goomba), context, 0, 0)
    }

    return () => {
        const goomba = new Entity()
        goomba.size.set(16, 16)

        goomba.addTrait(new Solid())
        goomba.addTrait(new PendulumMove())
        goomba.addTrait(new Behaviour())
        goomba.addTrait(new Killable())

        goomba.draw = (context: CanvasRenderingContext2D) => drawGoomba(context, goomba)

        return goomba
    }
}
