import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'

export class Run extends Trait {
    public direction: number
    public speed: number

    constructor() {
        super('run')

        this.direction = 0
        this.speed = 5000
    }

    public update = (entity: Entity, deltaTime: number) => {
        entity.velocity.x = this.speed * this.direction * deltaTime
    }
}
