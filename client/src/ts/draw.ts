import { LevelBackground } from '../types/Levels'
import { SpriteSheet } from './SpriteSheet'

export const drawBackground = (background: LevelBackground, context: CanvasRenderingContext2D, sprites: SpriteSheet) => {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y)
            }
        }
    })
}
