import { Camera } from './Camera'
import { CompositorLayer } from '../../types/Compositor'

export class Compositor {
    public layers: CompositorLayer[]

    constructor() {
        this.layers = []
    }

    public draw = (context: CanvasRenderingContext2D, camera: Camera) => {
        this.layers.forEach(layer => {
            layer(context, camera)
        })
    }
}
