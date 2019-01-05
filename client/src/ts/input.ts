import { KeyboardState } from './Classes/KeyboardState'
import { Entity } from './Classes/Entity'

export const setupInputHandler = (entity: Entity) => {
    const SPACEBAR = 'Space'
    const LEFT_ARROW = 'ArrowLeft'
    const RIGHT_ARROW = 'ArrowRight'
    const input = new KeyboardState()

    input.addMapping(SPACEBAR, (keyState: number) => {
        if (keyState) {
            entity.jump.start()
        } else {
            entity.jump.cancel()
        }
    })

    input.addMapping(LEFT_ARROW, (keyState: number) => {
        entity.run.direction += keyState
            ? -1
            : 1
    })

    input.addMapping(RIGHT_ARROW, (keyState: number) => {
        entity.run.direction += keyState
            ? 1
            : -1
    })

    return input
}
