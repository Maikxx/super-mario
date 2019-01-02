import { SpriteSheet } from './Classes/SpriteSheet'
import { Entity } from './Classes/Entity'
import { Level } from './Classes/Level'

export const createBackgroundLayer = (level: Level, sprites: SpriteSheet) => {
    const buffer = document.createElement('canvas') as HTMLCanvasElement
    const bufferContext = buffer.getContext('2d') as CanvasRenderingContext2D
    buffer.width = 640
    buffer.height = 640

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y)
    })

    return (context: CanvasRenderingContext2D) => {
        context.drawImage(buffer, 0, 0)
    }
}

export const createSpriteLayer = (entities: Set<Entity>) => {
    return (context: CanvasRenderingContext2D) => {
        entities.forEach(entity => {
            entity.draw(context)
        })
    }
}
