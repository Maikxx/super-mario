import { LevelBackground } from '../types/Levels'
import { SpriteSheet } from './Classes/SpriteSheet'
import { Entity } from './Classes/Entity'

const drawBackground = (background: LevelBackground, context: CanvasRenderingContext2D, sprites: SpriteSheet) => {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y)
            }
        }
    })
}

export const createBackgroundLayer = (backgrounds: LevelBackground[], sprites: SpriteSheet) => {
    const buffer = document.createElement('canvas') as HTMLCanvasElement
    const bufferContext = buffer.getContext('2d') as CanvasRenderingContext2D
    buffer.width = 640
    buffer.height = 640

    backgrounds.forEach(background => {
        drawBackground(background, bufferContext, sprites)
    })

    return (context: CanvasRenderingContext2D) => {
        context.drawImage(buffer, 0, 0)
    }
}

export const createSpriteLayer = (entities: Set<Entity>) => {
    return (context: CanvasRenderingContext2D) => {
        entities.forEach(entity => {
            entity.draw(context)
        })
    }
}
