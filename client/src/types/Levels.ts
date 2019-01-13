import { Grid } from './Matrix'

export interface ResolvedTile {
    tile: Grid
    y1: number
    y2: number
    x1: number
    x2: number
}

export interface LevelSpecificationTile {
    name: string
    pattern?: string
    type: string
    ranges: number[][]
}

export interface LevelSpecificationPattern {
    tiles: LevelSpecificationTile[]
}

export interface LevelSpecificationPatterns {
    [key: string]: LevelSpecificationPattern
}

export interface LevelSpecification {
    spriteSheet: string
    tiles: LevelSpecificationTile[]
    patterns: LevelSpecificationPatterns
}

export interface LevelSpecifications {
    [key: string]: LevelSpecification
}
