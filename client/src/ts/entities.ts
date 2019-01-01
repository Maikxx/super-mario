import { loadMarioSprite } from './sprites'
import { Entity } from './Classes/Entity'
import { Jump } from './Traits/Jump'
import { Velocity } from './Traits/Velocity'

export const createMario = async () => {
    const sprite = await loadMarioSprite()

    const mario = new Entity()

    mario.addTrait(new Velocity())
    mario.addTrait(new Jump())

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw('idle', context, mario.position.x, mario.position.y)
    }

    return mario
}
