import { Entity } from './Entity'

export class Trait {
    public NAME: string

    constructor(name: string) {
        this.NAME = name
    }

    public update = (entity: Entity, deltaTime: number) => {
        console.warn('Unhandled update call')
    }
}
