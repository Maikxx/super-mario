import { Level } from '../Classes/Level'
import { LevelSpecificationTile, LevelSpecificationPatterns, LevelSpecification, ExpandedTile } from '../../types/Levels'
import { Camera } from '../Classes/Camera'
import { loadSpriteSheet, loadJSON } from '../loaders'
import { createBackgroundLayer, createSpriteLayer } from '../layers'

function* expandSpan (xStart: number, xLength: number, yStart: number, yLength: number) {
    const xEnd = xStart + xLength
    const yEnd = yStart + yLength

    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield { x, y }
        }
    }
}

function* expandRanges(ranges: number[][]) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item
        }
    }
}

const expandRange = (range: number[]) => {
    if (range.length === 2) {
        const [ xStart, yStart ] = range

        return expandSpan(xStart, 1, yStart, 1)
    } else if (range.length === 3) {
        const [ xStart, xLength, yStart ] = range

        return expandSpan(xStart, xLength, yStart, 1)
    } else if (range.length === 4) {
        const [ xStart, xLength, yStart, yLength ] = range

        return expandSpan(xStart, xLength, yStart, yLength)
    }

    return { x: 0, y: 0 }
}

export const expandTiles = (tiles: LevelSpecificationTile[], patterns?: LevelSpecificationPatterns) => {
    const expandedTiles: ExpandedTile[] = []

    const walkTiles = (tiles: LevelSpecificationTile[], offsetX: number, offsetY: number) => {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX
                const derivedY = y + offsetY

                if (tile.pattern && patterns) {
                    const patternTiles = patterns[tile.pattern].tiles
                    walkTiles(patternTiles, derivedX, derivedY)
                } else {
                    expandedTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY,
                    })
                }
            }
        }
    }

    walkTiles(tiles, 0, 0)

    return expandedTiles
}

export const loadLevel = async (name: string, camera: Camera) => {
    const levelSpec = await loadJSON(`https://super-mario-server.herokuapp.com/levels/${name}.json`) as LevelSpecification
    const level = new Level()
    const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)

    for (const { tile, x, y } of expandTiles(levelSpec.tiles, levelSpec.patterns)) {
        level.tiles.set(x, y, {
            name: tile.name,
            type: tile.type,
        })
    }

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
    const spriteLayer = createSpriteLayer(level.entities)
    // const collisionLayer = createCollisionLayer(level)
    // const cameraLayer = createCameraLayer(camera)

    level.composition.layers.push(backgroundLayer, spriteLayer)

    return level
}
