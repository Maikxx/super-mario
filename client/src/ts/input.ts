import { KeyboardState } from './Classes/KeyboardState'
import { Entity } from './Classes/Entity'

export const setupInputHandler = (mario: Entity) => {
    const SPACEBAR = 'Space'
    const LEFT_ARROW = 'ArrowLeft'
    const RIGHT_ARROW = 'ArrowRight'
    const SHIFT_KEY = 'ShiftRight'
    const input = new KeyboardState()

    input.addMapping(SPACEBAR, (keyState: number) => {
        if (mario.jump) {
            if (keyState) {
                mario.jump.start()
            } else {
                mario.jump.cancel()
            }
        }
    })

    // Speed up the game by pressing Shift
    input.addMapping(SHIFT_KEY, (keyState: number) => {
        if (mario.turbo) {
            mario.turbo(keyState)
        }
    })

    input.addMapping(LEFT_ARROW, (keyState: number) => {
        if (!mario.run) {
            return
        }

        mario.run.direction += keyState
            ? -1
            : 1
    })

    input.addMapping(RIGHT_ARROW, (keyState: number) => {
        if (!mario.run) {
            return
        }

        mario.run.direction += keyState
            ? 1
            : -1
    })

    return input
}
