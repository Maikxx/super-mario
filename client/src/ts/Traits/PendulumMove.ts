import { Entity, Sides } from '../Classes/Entity'
import { Trait } from '../Classes/Trait'

export class PendulumMove extends Trait {
    public speed: number
    public enabled = true

    constructor() {
        super('pendulumMove')
        this.speed = -30
    }

    public obstruct = (entity: Entity, side: Symbol) => {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed
        }
    }

    public update = (entity: Entity) => {
        if (this.enabled) {
            entity.velocity.x = this.speed
        }
    }
}
