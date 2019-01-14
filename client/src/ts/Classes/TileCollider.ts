import { Entity, Sides } from './Entity'
import { Matrix } from './Math'
import { TileResolver } from './TileResolver'

export class TileCollider {
    public tiles: TileResolver

    constructor(tiles: Matrix) {
        this.tiles = new TileResolver(tiles)
    }

    public checkX = (entity: Entity) => {
        let x
        if (entity.velocity.x > 0) {
            x = entity.boundingBox.right
        } else if (entity.velocity.x < 0) {
            x = entity.boundingBox.left
        } else {
            return
        }

        const matches = this.tiles.searchByRange(x, x, entity.boundingBox.top, entity.boundingBox.bottom)

        matches.forEach(match => {
            if (!match || match.tile.type !== 'ground') {
                return
            }

            if (entity.velocity.x > 0) {
                if (entity.boundingBox.right > match.x1) {
                    entity.boundingBox.left = match.x1
                    entity.velocity.x = 0

                    entity.obstruct(Sides.RIGHT)
                }
            } else if (entity.velocity.x < 0) {
                if (entity.boundingBox.left < match.x2) {
                    entity.boundingBox.left = match.x2
                    entity.velocity.x = 0

                    entity.obstruct(Sides.LEFT)
                }
            }
        })
    }

    public checkY = (entity: Entity) => {
        let y
        if (entity.velocity.y > 0) {
            y = entity.boundingBox.bottom
        } else if (entity.velocity.y < 0) {
            y = entity.boundingBox.top
        } else {
            return
        }

        const matches = this.tiles.searchByRange(entity.boundingBox.left, entity.boundingBox.right, y, y)

        matches.forEach(match => {
            if (!match || match.tile.type !== 'ground') {
                return
            }

            if (entity.velocity.y > 0) {
                if (entity.boundingBox.bottom > match.y1) {
                    entity.boundingBox.bottom = match.y1
                    entity.velocity.y = 0

                    entity.obstruct(Sides.BOTTOM)
                }
            } else if (entity.velocity.y < 0) {
                if (entity.boundingBox.top < match.y2) {
                    entity.boundingBox.top = match.y2
                    entity.velocity.y = 0

                    entity.obstruct(Sides.TOP)
                }
            }
        })
    }
}
