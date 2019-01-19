import { Trait } from '../Classes/Trait'
import { Entity, Sides } from '../Classes/Entity'
import { ResolvedTile } from '../../types/Levels'

export class Solid extends Trait {
    public obstructs = true

    constructor() {
        super('solid')
    }

    public obstruct = (entity: Entity, side: Symbol, match?: ResolvedTile) => {
        if (!this.obstructs) {
            return
        }

        if (match) {
            if (side === Sides.BOTTOM) {
                entity.boundingBox.bottom = match.y1
                entity.velocity.y = 0
            } else if (side === Sides.TOP) {
                entity.boundingBox.top = match.y2
                entity.velocity.y = 0
            } else if (side === Sides.RIGHT) {
                entity.boundingBox.left = match.x1
                entity.velocity.x = 0
            } else if (side === Sides.LEFT) {
                entity.boundingBox.left = match.x2
                entity.velocity.x = 0
            }
        }
    }
}
