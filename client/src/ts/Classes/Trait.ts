import { Entity } from './Entity'
import { Level } from './Level'

// tslint:disable:no-empty
export class Trait {
    public NAME: string

    constructor(name: string) {
        this.NAME = name
    }

    public obstruct = (entity: Entity, side: Symbol) => {}
    public collides = (us: Entity, them: Entity) => {}
    public update = (entity: Entity, deltaTime: number, level: Level) => {}
}
// tslint:enable:no-empty
