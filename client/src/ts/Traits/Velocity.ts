import { Entity } from '../Classes/Entity'
import { Trait } from '../Classes/Trait'

export class Velocity extends Trait {
    constructor() {
        super('vel')
    }

    public update = (entity: Entity, deltaTime: number) => {
        const { x: vx, y: vy } = entity.velocity

        entity.position.x += vx * deltaTime
        entity.position.y += vy * deltaTime
    }
}
