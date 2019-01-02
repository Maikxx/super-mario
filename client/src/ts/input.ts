import { KeyboardState } from './Classes/KeyboardState'
import { Entity } from './Classes/Entity'

export const setupInputHandler = (entity: Entity) => {
    const SPACEBAR = 32
    const LEFT_ARROW = 37
    const RIGHT_ARROW = 39
    const input = new KeyboardState()

    input.addMapping(SPACEBAR, (keyState: number) => {
        if (keyState) {
            entity.jump.start()
        } else {
            entity.jump.cancel()
        }
    })
    input.addMapping(RIGHT_ARROW, (keyState: number) => {
        entity.run.direction = keyState
    })
    input.addMapping(LEFT_ARROW, (keyState: number) => {
        entity.run.direction = -keyState
    })

    return input
}
