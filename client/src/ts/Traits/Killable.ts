import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'
import { Level } from '../Classes/Level'

export class Killable extends Trait {
    public dead = false
    public deadTime = 0
    public removeAfter = 2

    constructor() {
        super('killable')
    }

    public kill = () => {
        this.dead = true
    }

    public revive = () => {
        this.dead = false
        this.deadTime = 0
    }

    public update = (entity: Entity, deltaTime: number, level: Level) => {
        if (this.dead) {
            this.deadTime += deltaTime

            if (this.deadTime > this.removeAfter) {
                level.entities.delete(entity)
            }
        }
    }
}
