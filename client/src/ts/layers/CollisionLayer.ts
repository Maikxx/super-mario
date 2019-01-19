import { Level } from '../Classes/Level'
import { Coordinate } from '../../types/Coordinate'
import { Camera } from '../Classes/Camera'

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
                entity.boundingBox.left - camera.position.x,
                entity.boundingBox.top - camera.position.y,
                entity.size.x, entity.size.y
            )
            context.stroke()
        })

        resolvedTiles.length = 0
    }
}
