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

export interface SpriteSheetSpecification {
    imageName: string
    tileWidth?: number
    tileHeight?: number
    tiles?: SpriteSheetSpecificationTile[]
    frames?: SpriteSheetSpecificationFrame[]
}

export interface SpriteSheetSpecifications {
    [name: string]: SpriteSheetSpecification
}
