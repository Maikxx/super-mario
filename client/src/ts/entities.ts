import { Entity } from './Entity'
import { loadMarioSprite } from './sprites'

export const createMario = async () => {
    const sprite = await loadMarioSprite()

    const mario = new Entity()
    mario.position.set(64, 180)
    mario.velocity.set(2, -10)

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw('idle', context, mario.position.x, mario.position.y)
    }

    mario.update = () => {
        const { x: vx, y: vy } = mario.velocity

        mario.position.x += vx
        mario.position.y += vy
    }

    return mario
}
