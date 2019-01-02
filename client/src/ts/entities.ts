import { Entity } from './Classes/Entity'
import { Jump } from './Traits/Jump'
import { Run } from './Traits/Run'
import { loadSpriteSheet } from './loaders'

export const createMario = async () => {
    const sprite = await loadSpriteSheet('mario')
    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Run())
    mario.addTrait(new Jump())

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw('idle', context, 0, 0)
    }

    return mario
}
