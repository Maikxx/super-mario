import { Entity } from './Entity'
import { Matrix } from './Math'
import { TileResolver } from './TileResolver'

export class TileCollider {
    public tiles: TileResolver

    constructor(tiles: Matrix) {
        this.tiles = new TileResolver(tiles)
    }

    public checkY = (entity: Entity) => {
        const matches = this.tiles.searchByRange(
            entity.position.x, entity.position.x + entity.size.x,
            entity.position.y, entity.position.y + entity.size.y
        )

        matches.forEach(match => {
            if (!match) {
                return
            }

            if (match.tile.name !== 'ground') {
                return
            }

            if (entity.velocity.y > 0) {
                if (entity.position.y + entity.size.y > match.y1) {
                    entity.position.y = match.y1 - entity.size.y
                    entity.velocity.y = 0
                }
            } else if (entity.velocity.y < 0) {
                if (entity.position.y < match.y2) {
                    entity.position.y = match.y2
                    entity.velocity.y = 0
                }
            }
        })
    }

    public test = (entity: Entity) => {
        this.checkY(entity)
    }
}
