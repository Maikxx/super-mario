import { Grid } from '../../types/Matrix'

export class Matrix {
    public grid: Grid[][]

    constructor() {
        this.grid = []
    }

    public forEach = (callback: (value: Grid, x: number, y: number) => void) => {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y)
            })
        })
    }

    public set = (x: number, y: number, value: Grid) => {
        if (!this.grid[x]) {
            this.grid[x] = []
        }

        this.grid[x][y] = value
    }

    public get = (x: number, y: number): Grid | undefined => {
        const column = this.grid[x]

        if (!column) {
            return undefined
        }

        return column[y]
    }
}

export class Vec2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.set(x, y)
    }

    public set = (x: number, y: number) => {
        this.x = x
        this.y = y
    }
}
