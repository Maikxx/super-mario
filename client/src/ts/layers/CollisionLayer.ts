import { Level } from '../Classes/Level'
import { Coordinate } from '../../types/Coordinate'
import { Camera } from '../Classes/Camera'
import { Entity } from '../Classes/Entity'
import { TileCollider } from '../Classes/TileCollider'

export const createEntityLayer = (entities: Set<Entity>) => {
    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.strokeStyle = 'red'
        entities.forEach(entity => {
            context.beginPath()
            context.rect(
                entity.boundingBox.left - camera.position.x,
                entity.boundingBox.top - camera.position.y,
                entity.size.x, entity.size.y
            )
            context.stroke()
        })
    }
}

export const createTileCandidateLayer = (tileCollider: TileCollider) => {
    const resolvedTiles = [] as Coordinate[]

    const tileResolver = tileCollider.tiles
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

        resolvedTiles.length = 0
    }
}

export const createCollisionLayer = (level: Level) => {
    const drawTileCandidates = createTileCandidateLayer(level.tileCollider)
    const drawBoundingBoxes = createEntityLayer(level.entities)

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        drawBoundingBoxes(context, camera)
        drawTileCandidates(context, camera)
    }
}
