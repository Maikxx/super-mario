export class SpriteSheet {
    private image: HTMLImageElement
    private width: number
    private height: number
    private tiles: Map<string, HTMLCanvasElement>

    constructor(image: HTMLImageElement, width: number, height: number) {
        this.image = image
        this.width = width
        this.height = height
        this.tiles = new Map()
    }

    public define = (name: string, x: number, y: number, width: number, height: number) => {
        const buffer = document.createElement('canvas')
        buffer.width = width
        buffer.height = height
        const context = buffer.getContext('2d') as CanvasRenderingContext2D
        context.drawImage(
            this.image,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        )

        this.tiles.set(name, buffer)
    }

    public defineTile = (name: string, x: number, y: number) => {
        this.define(name, x * this.width, y * this.height, this.width, this.height)
    }

    public draw = (name: string, context: CanvasRenderingContext2D, x: number, y: number) => {
        const buffer = this.tiles.get(name) as HTMLCanvasElement
        context.drawImage(buffer, x, y)
    }

    public drawTile = (name: string, context: CanvasRenderingContext2D, x: number, y: number) => {
        this.draw(name, context, x * this.width, y * this.height)
    }
}
