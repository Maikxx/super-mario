import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { TileCollider } from './TileCollider'
import { Matrix } from './Math'

export class Level {
    public composition: Compositor
    public entities: Set<Entity>
    public tileCollider: TileCollider | null
    public totalTimePassed: number
    private gravity: number

    constructor() {
        this.gravity = 1500
        this.composition = new Compositor()
        this.entities = new Set()
        this.tileCollider = null
        this.totalTimePassed = 0
    }

    public setCollisionGrid = (matrix: Matrix) => {
        this.tileCollider = new TileCollider(matrix)
    }

    public update = (deltaTime: number) => {
        this.entities.forEach(entity => {
            entity.update(deltaTime)

            if (!this.tileCollider) {
                return
            }

            entity.position.x += entity.velocity.x * deltaTime
            this.tileCollider.checkX(entity)

            entity.position.y += entity.velocity.y * deltaTime
            this.tileCollider.checkY(entity)

            entity.velocity.y += this.gravity * deltaTime
        })

        this.totalTimePassed += deltaTime
    }
}
