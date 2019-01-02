import { Entity } from './Classes/Entity'
import { Camera } from './Classes/Camera'

export const debugCollision = (canvas: HTMLCanvasElement, entity: Entity, camera: Camera) => {
    let lastEvent: MouseEvent

    [ 'mousedown', 'mousemove' ].forEach(eventName => {
        canvas.addEventListener(eventName, (event: MouseEvent) => {
            if (event.buttons === 1) {
                entity.velocity.set(0, 0)
                entity.position.set(
                    event.offsetX + camera.position.x,
                    event.offsetY + camera.position.y
                )
            } else if (event.buttons === 2 && lastEvent.buttons === 2 && lastEvent.type === 'mousemove') {
                camera.position.x -= event.offsetX - lastEvent.offsetX
            }

            lastEvent = event
        })

        canvas.addEventListener('contextmenu', event => {
            event.preventDefault()
        })
    })
}
