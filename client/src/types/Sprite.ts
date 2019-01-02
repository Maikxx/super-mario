export interface SpritePosition {
    x: number
    y: number
}

export type SpriteSheetSpecificationTileIndex = number[]

export interface SpriteSheetSpecificationTile {
    name: string
    index: SpriteSheetSpecificationTileIndex
}

export interface SpriteSheetSpecification {
    imageName: string
    tileWidth: number
    tileHeight: number
    tiles: SpriteSheetSpecificationTile[]
}

export interface SpriteSheetSpecifications {
    [name: string]: SpriteSheetSpecification
}
