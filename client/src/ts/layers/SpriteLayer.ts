import { Entity } from '../Classes/Entity'
import { Camera } from '../Classes/Camera'

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
