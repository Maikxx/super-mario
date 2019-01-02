import { SpriteSheet } from './Classes/SpriteSheet'
import { Entity } from './Classes/Entity'
import { Level } from './Classes/Level'
import { Coordinate } from '../types/Coordinate'
import { Camera } from './Classes/Camera'

export const createBackgroundLayer = (level: Level, sprites: SpriteSheet) => {
    const buffer = document.createElement('canvas') as HTMLCanvasElement
    const bufferContext = buffer.getContext('2d') as CanvasRenderingContext2D
    buffer.width = 640
    buffer.height = 640

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y)
    })

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.drawImage(buffer, -camera.position.x, -camera.position.y)
    }
}

export const createSpriteLayer = (entities: Set<Entity>, width: number = 64, height: number = 64) => {
    const spriteBuffer = document.createElement('canvas') as HTMLCanvasElement
    spriteBuffer.width = width
    spriteBuffer.height = height
    const spriteBufferContext = spriteBuffer.getContext('2d') as CanvasRenderingContext2D

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height)

            entity.draw(spriteBufferContext)

            context.drawImage(
                spriteBuffer,
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y
            )
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

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.strokeStyle = 'blue'

        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath()
            context.rect(
                x * tileSize - camera.position.x,
                y * tileSize - camera.position.y,
                tileSize, tileSize
            )
            context.stroke()
        })

        context.strokeStyle = 'red'
        level.entities.forEach(entity => {
            context.beginPath()
            context.rect(
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y,
                entity.size.x, entity.size.y
            )
            context.stroke()
        })

        resolvedTiles.length = 0
    }
}
