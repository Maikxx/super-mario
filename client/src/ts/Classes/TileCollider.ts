import { Entity } from './Entity'
import { Matrix } from './Math'
import { TileResolver } from './TileResolver'

export class TileCollider {
    public tiles: TileResolver

    constructor(tiles: Matrix) {
        this.tiles = new TileResolver(tiles)
    }

    public test = (entity: Entity) => {
        const match = this.tiles.matchByPosition(entity.position.x, entity.position.y)

        if (match) {
            console.log(match, match.tile)
        }
    }
}
