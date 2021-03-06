import { Grid } from './Matrix'

export interface ExpandedTile {
    tile: LevelSpecificationTile,
    x: number
    y: number
}

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

export interface LevelSpecificationLayer {
    tiles: LevelSpecificationTile[]
}

export interface LevelSpecificationEntity {
    name: string
    position: number[]
}

export interface LevelSpecification {
    spriteSheet: string
    layers: LevelSpecificationLayer[]
    patterns: LevelSpecificationPatterns
    entities: LevelSpecificationEntity[]
}

export interface LevelSpecifications {
    [key: string]: LevelSpecification
}
