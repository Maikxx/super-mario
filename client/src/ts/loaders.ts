import { levels } from './bundling/levels'
import { spriteSheetSpecifications } from './bundling/sprites'
import { Level } from './Classes/Level'
import { createBackgroundLayer, createSpriteLayer } from './layers'
import { LevelSpecificationPatterns, LevelSpecificationTile } from '../types/Levels'
import { SpriteSheet } from './Classes/SpriteSheet'
import { images } from './bundling/images'
import { Camera } from './Classes/Camera'
import { createAnimation } from './animation'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export const loadSpriteSheet = async (name: string) => {
    const spriteSheetSpecification = spriteSheetSpecifications[name]
    const { tileWidth, tileHeight, imageName, tiles, frames, animations } = spriteSheetSpecification

    const image = await loadImage(images[imageName])
    const sprites = new SpriteSheet(image, tileWidth || 16, tileHeight || 16)

    if (tiles) {
        tiles.forEach(tileSpecification => {
            sprites.defineTile(
                tileSpecification.name,
                tileSpecification.index[0],
                tileSpecification.index[1]
            )
        })
    }

    if (frames) {
        frames.forEach(frameSpecification => {
            const { name, boundingBox: [ x, y, width, height ] } = frameSpecification
            sprites.define(name, x, y, width, height)
        })
    }

    if (animations) {
        animations.forEach(animationSpecification => {
            const { name, frameLength, frames } = animationSpecification
            const animation = createAnimation(frames, frameLength)
            sprites.defineAnimation(name, animation)
        })
    }

    return sprites
}

export const createTiles = (
    level: Level,
    tiles: LevelSpecificationTile[],
    patterns?: LevelSpecificationPatterns,
    offsetX: number = 0,
    offsetY: number = 0
) => {
    const applyRange = (
        tile: LevelSpecificationTile,
        xStart: number,
        xLength: number,
        yStart: number,
        yLength: number
    ) => {
        const xEnd = xStart + xLength
        const yEnd = yStart + yLength

        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                const derivedX = x + offsetX
                const derivedY = y + offsetY

                if (tile.pattern && patterns) {
                    const patternBackgrounds = patterns[tile.pattern].tiles
                    createTiles(level, patternBackgrounds, patterns, derivedX, derivedY)
                } else {
                    level.tiles.set(derivedX, derivedY, {
                        name: tile.name,
                        type: tile.type,
                    })
                }
            }
        }
    }

    tiles.forEach(tile => {
        tile.ranges.forEach(range => {
            if (range.length === 2) {
                const [ xStart, yStart ] = range

                applyRange(tile, xStart, 1, yStart, 1)
            } else if (range.length === 3) {
                const [ xStart, xLength, yStart ] = range

                applyRange(tile, xStart, xLength, yStart, 1)
            } else if (range.length === 4) {
                const [ xStart, xLength, yStart, yLength ] = range

                applyRange(tile, xStart, xLength, yStart, yLength)
            }
        })
    })
}

export const loadLevel = async (name: string, camera: Camera) => {
    const levelSpec = levels[name]
    const level = new Level()
    const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)

    createTiles(level, levelSpec.tiles, levelSpec.patterns)

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
    const spriteLayer = createSpriteLayer(level.entities)
    // const collisionLayer = createCollisionLayer(level)
    // const cameraLayer = createCameraLayer(camera)

    level.composition.layers.push(backgroundLayer, spriteLayer)

    return level
}
