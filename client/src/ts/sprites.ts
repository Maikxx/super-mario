import { SpriteSheet } from './Classes/SpriteSheet'
import TileSprites from '../../public/assets/tiles.png'
import CharacterSprites from '../../public/assets/characters.gif'
import { loadImage } from './loaders'

export const loadBackgroundSprites = async (): Promise<SpriteSheet> => {
    const image = await loadImage(TileSprites)
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.defineTile('ground', 0, 0)
    sprites.defineTile('sky', 3, 23)

    return sprites
}

export const loadMarioSprite = async (): Promise<SpriteSheet> => {
    const image = await loadImage(CharacterSprites)
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('idle', 276, 44, 16, 16)

    return sprites
}
