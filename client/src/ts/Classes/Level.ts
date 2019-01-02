import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { Matrix } from './Math'
import { TileCollider } from './TileCollider'

export class Level {
    public composition: Compositor
    public entities: Set<Entity>
    public tiles: Matrix
    public tileCollider: TileCollider

    constructor() {
        this.composition = new Compositor()
        this.entities = new Set()
        this.tiles = new Matrix()

        this.tileCollider = new TileCollider(this.tiles)
    }

    public update = (deltaTime: number) => {
        this.entities.forEach(entity => {
            entity.update(deltaTime)

            this.tileCollider.test(entity)
        })
    }
}
