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
    public gravity: number

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
        })

        this.entities.forEach(entity => {
            this.entityCollider.check(entity)
        })

        this.entities.forEach(entity => {
            entity.finalize()
        })

        this.totalTimePassed += deltaTime
    }
}
