import { loadMarioSprite } from './sprites'
import { Entity } from './Classes/Entity'
import { Jump } from './Traits/Jump'
import { Run } from './Traits/Run'

export const createMario = async () => {
    const sprite = await loadMarioSprite()

    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Run())
    mario.addTrait(new Jump())
    // mario.addTrait(new Velocity())

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw('idle', context, mario.position.x, mario.position.y)
    }

    return mario
}
