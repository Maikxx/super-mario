import { Entity, Sides } from '../Classes/Entity'
import { Trait } from '../Classes/Trait'

export class Jump extends Trait {
    public canJump = 0
    public duration = 0.3
    public velocity = 200
    public engageTime = 0
    public requestTime = 0
    public gracePeriod = 0.1
    private speedBoost = 0.3

    constructor() {
        super('jump')
    }

    public get falling() {
        return this.canJump < 0
    }

    public start() {
        this.requestTime = this.gracePeriod
    }

    public cancel() {
        this.engageTime = 0
        this.requestTime = 0
    }

    public obstruct = (entity: Entity, side: Symbol) => {
        if (side === Sides.BOTTOM) {
            this.canJump = 1
        } else if (side === Sides.TOP) {
            this.cancel()
        }
    }

    public update = (entity: Entity, deltaTime: number) => {
        if (this.requestTime > 0) {
            if (this.canJump > 0) {
                this.engageTime = this.duration
                this.requestTime = 0
            }

            this.requestTime -= deltaTime
        }

        if (this.engageTime > 0) {
            entity.velocity.y = -(this.velocity + Math.abs(entity.velocity.x) * this.speedBoost)
            this.engageTime -= deltaTime
        }

        this.canJump--
    }
}
