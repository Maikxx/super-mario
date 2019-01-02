import { levels } from './bundling/levels'
import { spriteSheetSpecifications } from './sprites'
import { Level } from './Classes/Level'
import { createBackgroundLayer, createSpriteLayer, createCollisionLayer } from './layers'
import { LevelSpecificationBackground } from '../types/Levels'
import { SpriteSheet } from './Classes/SpriteSheet'
import { images } from './bundling/images'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

const loadSpriteSheet = async (name: string) => {
    const spriteSheetSpecification = spriteSheetSpecifications[name]
    const { tileWidth, tileHeight, imageName, tiles } = spriteSheetSpecification

    const image = await loadImage(images[imageName])
    const sprites = new SpriteSheet(
        image,
        tileWidth,
        tileHeight
    )
    tiles.forEach(tileSpecification => {
        sprites.defineTile(
            tileSpecification.name,
            tileSpecification.index[0],
            tileSpecification.index[1]
        )
    })

    return sprites
}

export const createTiles = (level: Level, backgrounds: LevelSpecificationBackground[]) => {
    const applyRange = (background: LevelSpecificationBackground, xStart: number, xLength: number, yStart: number, yLength: number) => {
        const xEnd = xStart + xLength
        const yEnd = yStart + yLength

        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type,
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
    const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)

    createTiles(level, levelSpec.backgrounds)

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
    level.composition.layers.push(backgroundLayer)

    const spriteLayer = createSpriteLayer(level.entities)
    level.composition.layers.push(spriteLayer)

    const collisionLayer = createCollisionLayer(level)
    level.composition.layers.push(collisionLayer)

    return level
}
