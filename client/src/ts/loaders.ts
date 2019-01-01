import Level1 from '../levels/1-1.json'
import { Levels } from '../types/Levels'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}

export const loadLevels = (): Levels => {
    return {
        levelOne: Level1,
    }
}
