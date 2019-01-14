import { loadMario } from './entities/Mario'
import { loadGoomba } from './entities/Goomba'
import { loadKoopa } from './entities/Koopa'
import { Entity } from './Classes/Entity'

interface EntityFactories {
    [key: string]: () => Entity
}

export const loadEntities = async () => {
    const entityFactories: EntityFactories = {}

    const addAs = (name: string) => {
        return (factory: () => Entity) => entityFactories[name] = factory
    }

    await Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
    ])

    return entityFactories
}
