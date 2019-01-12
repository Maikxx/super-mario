import { Entity } from './Entity'

export class Trait {
    public NAME: string

    constructor(name: string) {
        this.NAME = name
    }

    // tslint:disable-next-line:no-empty
    public obstruct = (entity: Entity, side: Symbol) => {}

    public update = (entity: Entity, deltaTime: number) => {
        console.warn('Unhandled update call')
    }
}
