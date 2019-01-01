type CompositorLayer = (context: CanvasRenderingContext2D) => void

export class Compositor {
    public layers: CompositorLayer[]

    constructor() {
        this.layers = []
    }

    public draw = (context: CanvasRenderingContext2D) => {
        this.layers.forEach(layer => {
            layer(context)
        })
    }
}
