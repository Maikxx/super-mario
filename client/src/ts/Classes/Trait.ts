import { Entity } from './Entity'
import { Level } from './Level'
import { ResolvedTile } from '../../types/Levels'

// tslint:disable:no-empty
export class Trait {
    public NAME: string
    public tasks: any[] = []

    constructor(name: string) {
        this.NAME = name
    }

    public finalize = () => {
        this.tasks.forEach(task => task())
        this.tasks.length = 0
    }

    public queue = (task: () => void) => {
        this.tasks.push(task)
    }

    public obstruct = (entity: Entity, side: Symbol, match?: ResolvedTile) => {}
    public collides = (us: Entity, them: Entity) => {}
    public update = (entity: Entity, deltaTime: number, level: Level) => {}
}
// tslint:enable:no-empty
