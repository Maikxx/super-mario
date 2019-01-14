import { Vec2 } from './Math'

export class BoundingBox {
    public position: Vec2
    public size: Vec2
    public offset: Vec2

    constructor(position: Vec2, size: Vec2, offset: Vec2) {
        this.position = position
        this.size = size
        this.offset = offset
    }

    public get bottom() {
        return this.position.y + this.size.y + this.offset.y
    }

    public set bottom(y: number) {
        this.position.y = y - (this.size.y + this.offset.y)
    }

    public get top() {
        return this.position.y + this.offset.y
    }

    public set top(y: number) {
        this.position.y = y - this.offset.y
    }

    public get left() {
        return this.position.x + this.offset.x
    }

    public set left(x: number) {
        this.position.x = x - this.offset.x
    }

    public get right() {
        return this.position.x + this.size.x + this.offset.x
    }

    public set right(x: number) {
        this.position.x = x - (this.size.x + this.offset.x)
    }
}
