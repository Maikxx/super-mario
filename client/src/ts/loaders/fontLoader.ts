import { loadImage } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'

const CHARACTERS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

export class Font {
    public sprites: SpriteSheet
    public size: number

    constructor(sprites: SpriteSheet, size: number) {
        this.sprites = sprites
        this.size = size
    }

    public print = (text: string, context: CanvasRenderingContext2D, x: number, y: number) => {
        [...text].forEach((character, position) => {
            this.sprites.draw(character, context, x + position * this.size, y)
        })
    }
}

export const loadFont = async () => {
    const image = await loadImage(`https://super-mario-server.herokuapp.com/images/font.png`)
    const fontSprite = new SpriteSheet(image, 8, 8)

    const size = 8
    const rowLength = image.width

    for (const [ index, character ] of [...CHARACTERS].entries()) {
        const x = index * size % rowLength
        const y = Math.floor(index * size / rowLength) * size

        fontSprite.define(character, x, y, size, size)
    }

    return new Font(fontSprite, size)
}
