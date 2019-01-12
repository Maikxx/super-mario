import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'

export class Run extends Trait {
    public direction: number
    public acceleration: number
    public deceleration: number
    public distance: number
    public heading: number
    public dragFactor: number

    constructor() {
        super('run')

        this.direction = 0
        this.acceleration = 400
        this.deceleration = 300
        this.dragFactor = 1 / 5000
        this.distance = 0
        this.heading = 1
    }

    public update = (entity: Entity, deltaTime: number) => {
        const absractXVelocity = Math.abs(entity.velocity.x)

        if (this.direction !== 0) {
            entity.velocity.x += this.acceleration * this.direction * deltaTime

            if (entity.jump) {
                if (entity.jump.falling === false) {
                    this.heading = this.direction
                }
            } else {
                this.heading = this.direction
            }
        } else if (entity.velocity.x !== 0) {
            const deceleration = Math.min(absractXVelocity, this.deceleration * deltaTime)

            entity.velocity.x += entity.velocity.x > 0
                ? -deceleration
                : deceleration
        } else {
            this.distance = 0
        }

        const drag = this.dragFactor * entity.velocity.x * absractXVelocity
        entity.velocity.x -= drag

        this.distance += absractXVelocity * deltaTime
    }
}
