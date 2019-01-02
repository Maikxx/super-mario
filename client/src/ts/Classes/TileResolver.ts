import { Matrix } from './Math'
import { ResolvedTile } from '../../types/Levels'

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

    public toIndexRange = (position1: number, position2: number) => {
        const pMax = Math.ceil(position2 / this.tileSize) * this.tileSize
        const range = []
        let position = position1

        do {
            range.push(this.toIndex(position))
            position += this.tileSize
        } while (position < pMax) {
            return range
        }
    }

    public getByIndex = (indexX: number, indexY: number): void | ResolvedTile => {
        const tile = this.matrix.get(indexX, indexY)
        if (tile) {
            const y1 = indexY * this.tileSize
            const y2 = y1 + this.tileSize
            const x1 = indexX * this.tileSize
            const x2 = x1 + this.tileSize

            return {
                tile,
                y1, y2,
                x1, x2,
            }
        }
    }

    public searchByPosition = (positionX: number, positionY: number) => {
        return this.getByIndex(this.toIndex(positionX), this.toIndex(positionY))
    }

    public searchByRange = (x1: number, x2: number, y1: number, y2: number) => {
        const matches = [] as ResolvedTile[]

        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY)

                if (match) {
                    matches.push(match)
                }
            })
        })

        return matches
    }
}
