import { levels } from './levels'
import { loadBackgroundSprites } from './sprites'
import { Level } from './Classes/Level'
import { createBackgroundLayer, createSpriteLayer, createCollisionLayer } from './layers'
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
    const applyRange = (background: LevelBackground, xStart: number, xLength: number, yStart: number, yLength: number) => {
        const xEnd = xStart + xLength
        const yEnd = yStart + yLength

        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile,
                })
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 2) {
                const [ xStart, yStart ] = range
                applyRange(background, xStart, 1, yStart, 1)
            } else if (range.length === 3) {
                const [ xStart, xLength, yStart ] = range
                applyRange(background, xStart, xLength, yStart, 1)
            } else if (range.length === 4) {
                const [ xStart, xLength, yStart, yLength ] = range
                applyRange(background, xStart, xLength, yStart, yLength)
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

    const collisionLayer = createCollisionLayer(level)
    level.composition.layers.push(collisionLayer)

    return level
}
