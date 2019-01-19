import { Level } from '../Classes/Level'
import { Matrix } from '../Classes/Math'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { TileResolver } from '../Classes/TileResolver'
import { Camera } from '../Classes/Camera'

export const createBackgroundLayer = (level: Level, tiles: Matrix, sprites: SpriteSheet) => {
    const resolver = new TileResolver(tiles)
    const buffer = document.createElement('canvas') as HTMLCanvasElement
    const bufferContext = buffer.getContext('2d') as CanvasRenderingContext2D

    buffer.width = 640 + 16
    buffer.height = 320

    const redraw = (startIndex: number, endIndex: number) => {
        bufferContext.clearRect(0, 0, buffer.width, buffer.height)

        for (let x = startIndex; x < endIndex; x++) {
            const column = tiles.grid[x]

            if (column) {
                column.forEach((tile, y) => {
                    const { name } = tile

                    if (sprites.animations.has(name)) {
                        sprites.drawAnimation(name, bufferContext, x - startIndex, y, level.totalTimePassed)
                    } else {
                        sprites.drawTile(name, bufferContext, x - startIndex, y)
                    }
                })
            }
        }
    }

    tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y)
    })

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const drawWith = resolver.toIndex(camera.size.x)
        const drawFrom = resolver.toIndex(camera.position.x)
        const drawTo = drawFrom + drawWith

        redraw(drawFrom, drawTo)

        context.drawImage(
            buffer,
            -camera.position.x % 16,
            -camera.position.y
        )
    }
}
