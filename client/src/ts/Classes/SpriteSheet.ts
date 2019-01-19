export class SpriteSheet {
    public animations: Map<string, (distance: number) => string>
    private image: HTMLImageElement
    private width: number
    private height: number
    private tiles: Map<string, HTMLCanvasElement[]>

    constructor(image: HTMLImageElement, width: number = 16, height: number = 16) {
        this.image = image
        this.width = width
        this.height = height
        this.tiles = new Map()
        this.animations = new Map()
    }

    public defineAnimation = (name: string, animation: (distance: number) => string) => {
        this.animations.set(name, animation)
    }

    public define = (name: string, x: number, y: number, width: number, height: number) => {
        const buffers = [ true, false ].map(isFlipped => {
            const buffer = document.createElement('canvas')
            buffer.width = width
            buffer.height = height
            const context = buffer.getContext('2d') as CanvasRenderingContext2D

            if (isFlipped) {
                context.scale(-1, 1)
                context.translate(-width, 0)
            }

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

            return buffer
        })

        this.tiles.set(name, buffers)
    }

    public defineTile = (name: string, x: number, y: number) => {
        this.define(name, x * this.width, y * this.height, this.width, this.height)
    }

    public draw = (name: string, context: CanvasRenderingContext2D, x: number, y: number, isFlipped: boolean = false) => {
        const buffer = this.tiles.get(name) as HTMLCanvasElement[]
        const usableBuffer = buffer && buffer[isFlipped ? 0 : 1]
        context.drawImage(usableBuffer, x, y)
    }

    public drawAnimation = (name: string, context: CanvasRenderingContext2D, x: number, y: number, distance: number) => {
        const animation = this.animations.get(name)

        if (animation) {
            this.drawTile(animation(distance), context, x, y)
        }
    }

    public drawTile = (name: string, context: CanvasRenderingContext2D, x: number, y: number) => {
        this.draw(name, context, x * this.width, y * this.height)
    }
}
