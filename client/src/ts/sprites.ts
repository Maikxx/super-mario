import { SpriteSheet } from './Classes/SpriteSheet'
import OverworldSprite from '../../public/sprites/overworld.json'
import CharacterSprites from '../../public/assets/characters.gif'
import { loadImage } from './loaders'
import { SpriteSheetSpecifications } from '../types/Sprite'

export const spriteSheetSpecifications = {
    overworld: OverworldSprite,
} as SpriteSheetSpecifications

export const loadMarioSprite = async (): Promise<SpriteSheet> => {
    const image = await loadImage(CharacterSprites)
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('idle', 276, 44, 16, 16)

    return sprites
}
