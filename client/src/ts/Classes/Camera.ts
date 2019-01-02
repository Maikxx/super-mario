import { Vec2 } from './Math'

export class Camera {
    public position: Vec2
    public size: Vec2

    constructor() {
        this.position = new Vec2(0, 0)
        this.size = new Vec2(640, 320)
    }
}
