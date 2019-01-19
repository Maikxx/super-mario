import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'

export class Stomper extends Trait {
    public bounceSpeed = 400

    constructor() {
        super('stomper')
    }

    public bounce = (us: Entity, them: Entity) => {
        us.boundingBox.bottom = them.boundingBox.top
        us.velocity.y = -this.bounceSpeed
    }

    public collides = (us: Entity, them: Entity) => {
        if (!them.killable || them.killable.dead) {
            return
        }

        if (us.velocity.y > them.velocity.y) {
            this.bounce(us, them)
        }
    }
}
