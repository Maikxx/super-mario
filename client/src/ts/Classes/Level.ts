import { Compositor } from './Compositor'
import { Entity } from './Entity'
import { Matrix } from './Math'

export class Level {
    public composition: Compositor
    public entities: Set<Entity>
    public tiles: Matrix

    constructor() {
        this.composition = new Compositor()
        this.entities = new Set()
        this.tiles = new Matrix()
    }

    public update = (deltaTime: number) => {
        this.entities.forEach(entity => {
            entity.update(deltaTime)
        })
    }
}
