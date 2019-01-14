import { Entity, Sides } from '../Classes/Entity'
import { Trait } from '../Classes/Trait'

export class PendulumWalk extends Trait {
    public speed: number

    constructor() {
        super('pendulumWalk')
        this.speed = -30
    }

    public obstruct = (entity: Entity, side: Symbol) => {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed
        }
    }

    public update = (entity: Entity) => {
        entity.velocity.x = this.speed
    }
}
