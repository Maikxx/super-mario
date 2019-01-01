import { Entity } from './Entity'
import { loadMarioSprite } from './sprites'

export const createMario = async () => {
    const sprite = await loadMarioSprite()

    const mario = new Entity()

    mario.draw = (context: CanvasRenderingContext2D) => {
        sprite.draw('idle', context, mario.position.x, mario.position.y)
    }

    mario.update = (deltaTime: number) => {
        const { x: vx, y: vy } = mario.velocity

        mario.position.x += vx * deltaTime
        mario.position.y += vy * deltaTime
    }

    return mario
}
