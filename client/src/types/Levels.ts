import { Grid } from './Matrix'

export interface ResolvedTile {
    tile: Grid
    y1: number
    y2: number
    x1: number
    x2: number
}

export interface LevelSpecificationBackground {
    tile: string
    type: string
    ranges: number[][]
}

export interface LevelSpecification {
    spriteSheet: string
    backgrounds: LevelSpecificationBackground[]
}

export interface LevelSpecifications {
    [key: string]: LevelSpecification
}
