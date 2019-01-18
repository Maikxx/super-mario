import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'

export class Stomper extends Trait {
    public queueBounce: boolean
    public bounceSpeed = 400

    constructor() {
        super('stomper')
        this.queueBounce = false
    }

    public bounce = () => {
        this.queueBounce = true
    }

    public update = (entity: Entity) => {
        if (this.queueBounce) {
            entity.velocity.y = -this.bounceSpeed
            this.queueBounce = false
        }
    }
}
