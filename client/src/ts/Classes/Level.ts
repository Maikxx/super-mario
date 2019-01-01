import { Compositor } from './Compositor'
import { Entity } from './Entity'

export class Level {
    public composition: Compositor
    public entities: Set<Entity>

    constructor() {
        this.composition = new Compositor()
        this.entities = new Set()
    }

    public update = (deltaTime: number) => {
        this.entities.forEach(entity => {
            entity.update(deltaTime)
        })
    }
}
