import { Grid } from './Matrix'

export interface ResolvedTile {
    tile: Grid
    y1: number
    y2: number
    x1: number
    x2: number
}

export interface LevelBackground {
    tile: string
    ranges: number[][]
}

export interface Level {
    backgrounds: LevelBackground[]
}

export interface Levels {
    [key: string]: Level
}
