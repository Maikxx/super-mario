import { Entity } from '../Classes/Entity'
import { Trait } from '../Classes/Trait'

export class Jump extends Trait {
    public duration: number
    public velocity: number
    public engageTime: number

    constructor() {
        super('jump')

        this.duration = 0.5
        this.engageTime = 0
        this.velocity = 200
    }

    public start() {
        this.engageTime = this.duration
    }

    public cancel() {
        this.engageTime = 0
    }

    public update = (entity: Entity, deltaTime: number) => {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity
            this.engageTime -= deltaTime
        }
    }
}
