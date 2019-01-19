import { Trait } from '../Classes/Trait'
import { Entity } from '../Classes/Entity'
import { Level } from '../Classes/Level'
import { Vec2 } from '../Classes/Math'

export class PlayerController extends Trait {
    public player: null | Entity = null
    public checkPoint = new Vec2(0, 0)
    public time = 300
    public score = 0

    constructor() {
        super('playerController')
    }

    public setPlayer = (entity: Entity) => {
        this.player = entity

        if (this.player.stomper) {
            this.player.stomper.onStomp = () => {
                this.score += 100
            }
        }
    }

    public update = (entity: Entity, deltaTime: number, level: Level) => {
        if (!this.player) {
            return
        }

        if (!level.entities.has(this.player)) {
            if (this.player.killable) {
                this.player.killable.revive()
            }

            this.player.position.set(this.checkPoint.x, this.checkPoint.y)
            level.entities.add(this.player)
        } else {
            this.time -= deltaTime * 2
        }
    }
}
