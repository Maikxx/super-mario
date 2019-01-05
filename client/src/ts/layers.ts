import { SpriteSheet } from './Classes/SpriteSheet'
import { Entity } from './Classes/Entity'
import { Level } from './Classes/Level'
import { Coordinate } from '../types/Coordinate'
import { Camera } from './Classes/Camera'

export const createBackgroundLayer = (level: Level, sprites: SpriteSheet) => {
    const { tiles, tileCollider } = level
    const resolver = tileCollider.tiles
    const buffer = document.createElement('canvas') as HTMLCanvasElement
    const bufferContext = buffer.getContext('2d') as CanvasRenderingContext2D

    buffer.width = 640 + 16
    buffer.height = 320

    let startIndex: number
    let endIndex: number

    const redraw = (drawFrom: number, drawTo: number) => {
        startIndex = drawFrom
        endIndex = drawTo

        for (let x = startIndex; x < endIndex; x++) {
            const column = tiles.grid[x]

            if (column) {
                column.forEach((tile, y) => {
                    const { name } = tile

                    if (sprites.animations.has(name)) {
                        sprites.drawAnimation(name, bufferContext, x - startIndex, y, level.totalTimePassed)
                    } else {
                        sprites.drawTile(name, bufferContext, x - startIndex, y)
                    }
                })
            }
        }
    }

    tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y)
    })

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const drawWith = resolver.toIndex(camera.size.x)
        const drawFrom = resolver.toIndex(camera.position.x)
        const drawTo = drawFrom + drawWith

        redraw(drawFrom, drawTo)

        context.drawImage(
            buffer,
            -camera.position.x % 16,
            -camera.position.y
        )
    }
}

export const createSpriteLayer = (entities: Set<Entity>, width: number = 64, height: number = 64) => {
    const spriteBuffer = document.createElement('canvas') as HTMLCanvasElement
    const spriteBufferContext = spriteBuffer.getContext('2d') as CanvasRenderingContext2D

    spriteBuffer.width = width
    spriteBuffer.height = height

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

export const createCameraLayer = (cameraToDraw: Camera) => {
    return (context: CanvasRenderingContext2D, fromCamera: Camera) => {
        context.strokeStyle = 'purple'
        context.beginPath()
        context.rect(
            cameraToDraw.position.x - fromCamera.position.x,
            cameraToDraw.position.y - fromCamera.position.y,
            cameraToDraw.size.x, cameraToDraw.size.y
        )
        context.stroke()
    }
}
