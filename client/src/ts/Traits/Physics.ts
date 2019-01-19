import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'
import { Level } from '../Classes/Level'

export class Physics extends Trait {
    constructor() {
        super('physics')
    }

    public update = (entity: Entity, deltaTime: number, level: Level) => {
        entity.position.x += entity.velocity.x * deltaTime
        level.tileCollider.checkX(entity)

        entity.position.y += entity.velocity.y * deltaTime
        level.tileCollider.checkY(entity)

        entity.velocity.y += level.gravity * deltaTime
    }
}
