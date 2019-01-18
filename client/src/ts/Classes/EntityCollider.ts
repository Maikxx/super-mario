import { Entity } from './Entity'

export class EntityCollider {
    public entities: Set<Entity>

    constructor(entities: Set<Entity>) {
        this.entities = entities
    }

    public check = (subject: Entity) => {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return
            }

            if (subject.boundingBox.overlaps(candidate.boundingBox)) {
                subject.collides(candidate)
                candidate.collides(subject)
            }
        })
    }
}
