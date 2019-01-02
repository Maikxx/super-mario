import { SpriteSheetSpecifications } from '../../types/Sprite'

import OverworldSpriteSpecification from '../../sprites/overworld.json'
import UnderWorldSpriteSpecification from '../../sprites/underworld.json'
import MarioSpriteSpecification from '../../sprites/mario.json'

export const spriteSheetSpecifications = {
    overworld: OverworldSpriteSpecification,
    underworld: UnderWorldSpriteSpecification,
    mario: MarioSpriteSpecification,
} as SpriteSheetSpecifications
