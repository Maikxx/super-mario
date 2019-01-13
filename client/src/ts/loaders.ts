import { spriteSheetSpecifications } from './bundling/sprites'
import { SpriteSheet } from './Classes/SpriteSheet'
import { images } from './bundling/images'
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
