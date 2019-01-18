import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { TileCollider } from './TileCollider'
import { Matrix } from './Math'
import { EntityCollider } from './EntityCollider'

export class Level {
    public composition: Compositor
    public entities: Set<Entity>
    public tileCollider: TileCollider
    public totalTimePassed: number
    public entityCollider: EntityCollider
    private gravity: number

    constructor() {
        this.gravity = 1500
        this.composition = new Compositor()
        this.entities = new Set()
        this.entityCollider = new EntityCollider(this.entities)
        this.totalTimePassed = 0
    }

    public setCollisionGrid = (matrix: Matrix) => {
        this.tileCollider = new TileCollider(matrix)
    }

    public update = (deltaTime: number) => {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this)

            if (!this.tileCollider) {
                return
            }

            entity.position.x += entity.velocity.x * deltaTime

            if (entity.canCollide) {
                this.tileCollider.checkX(entity)
            }

            entity.position.y += entity.velocity.y * deltaTime

            if (entity.canCollide) {
                this.tileCollider.checkY(entity)
            }

            entity.velocity.y += this.gravity * deltaTime
        })

        this.entities.forEach(entity => {
            if (entity.canCollide) {
                this.entityCollider.check(entity)
            }
        })

        this.totalTimePassed += deltaTime
    }
}
