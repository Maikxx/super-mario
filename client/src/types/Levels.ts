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
