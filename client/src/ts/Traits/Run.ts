import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'

export class Run extends Trait {
    public direction: number
    public speed: number
    public distance: number
    public heading: number

    constructor() {
        super('run')

        this.direction = 0
        this.speed = 5000
        this.distance = 0
        this.heading = 1
    }

    public update = (entity: Entity, deltaTime: number) => {
        entity.velocity.x = this.speed * this.direction * deltaTime

        if (this.direction) {
            this.heading = this.direction
            entity.run.distance += Math.abs(entity.velocity.x * deltaTime)
        } else {
            this.distance = 0
        }
    }
}
