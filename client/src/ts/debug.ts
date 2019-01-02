import { Entity } from './Classes/Entity'

export const debugCollision = (canvas: HTMLCanvasElement, entity: Entity) => {
    [ 'mousedown', 'mousemove' ].forEach(eventName => {
        canvas.addEventListener(eventName, (event: MouseEvent) => {
            if (event.buttons === 1) {
                entity.velocity.set(0, 0)
                entity.position.set(event.offsetX, event.offsetY)
            }
        })
    })
}
