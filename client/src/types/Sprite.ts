export interface SpritePosition {
    x: number
    y: number
}

export type SpriteSheetSpecificationTileIndex = number[]

export interface SpriteSheetSpecificationTile {
    name: string
    index: SpriteSheetSpecificationTileIndex
}

export interface SpriteSheetSpecificationFrame {
    name: string
    boundingBox: number[]
}

export interface SpriteSheetSpecificationAnimation {
    name: string
    frameLength: number
    frames: string[]
}

export interface SpriteSheetSpecification {
    imageName: string
    tileWidth?: number
    tileHeight?: number
    tiles?: SpriteSheetSpecificationTile[]
    frames?: SpriteSheetSpecificationFrame[]
    animations?: SpriteSheetSpecificationAnimation[]
}

export interface SpriteSheetSpecifications {
    [name: string]: SpriteSheetSpecification
}
