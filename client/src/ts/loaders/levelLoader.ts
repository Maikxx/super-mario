import { Level } from '../Classes/Level'
import { LevelSpecificationTile, LevelSpecificationPatterns, LevelSpecification } from '../../types/Levels'
import { loadSpriteSheet, loadJSON } from '../loaders'
import { Matrix } from '../Classes/Math'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { EntityFactories } from '../entities'
import { createBackgroundLayer } from '../layers/BackgroundLayer'
import { createSpriteLayer } from '../layers/SpriteLayer'

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
        yield* expandRange(range)
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

export const createCollisionGrid = (tiles: LevelSpecificationTile[], patterns?: LevelSpecificationPatterns) => {
    const grid = new Matrix()

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type })
    }

    return grid
}

export const createBackgroundGrid = (tiles: LevelSpecificationTile[], patterns?: LevelSpecificationPatterns) => {
    const grid = new Matrix()

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name })
    }

    return grid
}

export function* expandTiles (tiles: LevelSpecificationTile[], patterns?: LevelSpecificationPatterns) {
    function* walkTiles (tiles: LevelSpecificationTile[], offsetX: number, offsetY: number): any {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX
                const derivedY = y + offsetY

                if (tile.pattern && patterns) {
                    const patternTiles = patterns[tile.pattern].tiles

                    yield* walkTiles(patternTiles, derivedX, derivedY)
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY,
                    }
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0)
}

const setupCollision = (leveSpecification: LevelSpecification, level: Level) => {
    const mergedTiles = leveSpecification.layers.reduce((mergedTiles, layerSpecification) => {
        return mergedTiles.concat(layerSpecification.tiles)
    }, [] as LevelSpecificationTile[])

    const collisionGrid = createCollisionGrid(mergedTiles, leveSpecification.patterns)

    level.setCollisionGrid(collisionGrid)
}

const setupBackgrounds = (levelSpecification: LevelSpecification, level: Level, backgroundSprites: SpriteSheet) => {
    levelSpecification.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpecification.patterns)
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites)

        level.composition.layers.push(backgroundLayer)
    })
}

const setupEntities = (levelSpecification: LevelSpecification, level: Level, entityFactory: EntityFactories) => {
    levelSpecification.entities.forEach(({ name, position: [ x, y ] }) => {
        const createEntity = entityFactory[name]
        const entity = createEntity()

        entity.position.set(x, y)
        level.entities.add(entity)
    })

    const spriteLayer = createSpriteLayer(level.entities)
    level.composition.layers.push(spriteLayer)
}

export const createLevelLoader = (entityFactory: EntityFactories) => async (name: string) => {
    const levelSpecification = await loadJSON(`https://super-mario-server.herokuapp.com/levels/${name}.json`) as LevelSpecification
    const level = new Level()
    const backgroundSprites = await loadSpriteSheet(levelSpecification.spriteSheet)

    setupCollision(levelSpecification, level)
    setupBackgrounds(levelSpecification, level, backgroundSprites)
    setupEntities(levelSpecification, level, entityFactory)

    return level
}
