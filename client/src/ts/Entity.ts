import { Vec2 } from './math'

export class Entity {
    public position: Vec2
    public velocity: Vec2

    public draw: (context: CanvasRenderingContext2D) => void
    public update: () => void

    constructor() {
        this.position = new Vec2(0, 0)
        this.velocity = new Vec2(0, 0)
    }
}
