import { levels } from './levels'
import { loadBackgroundSprites } from './sprites'
import { Level } from './Classes/Level'
import { createBackgroundLayer, createSpriteLayer } from './layers'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export const loadLevel = async (name: string) => {
    const levelSpec = levels[name]
    const level = new Level()
    const backgroundSprites = await loadBackgroundSprites()

    const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites)
    level.composition.layers.push(backgroundLayer)

    const spriteLayer = createSpriteLayer(level.entities)
    level.composition.layers.push(spriteLayer)

    return level
}
