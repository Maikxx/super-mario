import { Matrix } from './Math'
import { Grid } from '../../types/Matrix'

export class TileResolver {
    public matrix: Matrix
    public tileSize: number

    constructor(matrix: Matrix, tileSize?: number) {
        this.matrix = matrix
        this.tileSize = tileSize || 16
    }

    public toIndex = (position: number) => {
        return Math.floor(position / this.tileSize)
    }

    public getByIndex = (indexX: number, indexY: number): void | { tile: Grid } => {
        const tile = this.matrix.get(indexX, indexY)
        if (tile) {
            return { tile }
        }
    }

    public matchByPosition = (positionX: number, positionY: number) => {
        return this.getByIndex(this.toIndex(positionX), this.toIndex(positionY))
    }
}
