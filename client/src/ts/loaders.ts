import { levels } from './levels'
import { loadBackgroundSprites } from './sprites'
import { Level } from './Classes/Level'
import { createBackgroundLayer, createSpriteLayer } from './layers'
import { LevelBackground } from '../types/Levels'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export const createTiles = (level: Level, backgrounds: LevelBackground[]) => {
    backgrounds.forEach(background => {
        background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    level.tiles.set(x, y, {
                        name: background.tile,
                    })
                }
            }
        })
    })
}

export const loadLevel = async (name: string) => {
    const levelSpec = levels[name]
    const level = new Level()
    const backgroundSprites = await loadBackgroundSprites()

    createTiles(level, levelSpec.backgrounds)

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
    level.composition.layers.push(backgroundLayer)

    const spriteLayer = createSpriteLayer(level.entities)
    level.composition.layers.push(spriteLayer)

    return level
}
