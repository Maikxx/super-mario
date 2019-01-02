import { SpriteSheet } from './Classes/SpriteSheet'
import { Entity } from './Classes/Entity'
import { Level } from './Classes/Level'
import { Coordinate } from '../types/Coordinate'

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

export const createCollisionLayer = (level: Level) => {
    const resolvedTiles = [] as Coordinate[]

    const tileResolver = level.tileCollider.tiles
    const tileSize = tileResolver.tileSize

    const getByIndexOriginal = tileResolver.getByIndex
    tileResolver.getByIndex = (x: number, y: number) => {
        resolvedTiles.push({ x, y })
        return getByIndexOriginal.call(tileResolver, x, y)
    }

    return (context: CanvasRenderingContext2D) => {
        context.strokeStyle = 'blue'

        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath()
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
            context.stroke()
        })

        context.strokeStyle = 'red'
        level.entities.forEach(entity => {
            context.beginPath()
            context.rect(entity.position.x, entity.position.y, entity.size.x, entity.size.y)
            context.stroke()
        })

        resolvedTiles.length = 0
    }
}
