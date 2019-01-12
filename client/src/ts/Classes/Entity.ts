import { Vec2 } from './Math'
import { Trait } from './Trait'
import { Jump } from '../Traits/Jump'
import { Run } from '../Traits/Run'

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
}

export class Entity {
    public position: Vec2
    public velocity: Vec2
    public size: Vec2
    public traits: Trait[]
    public run: Run
    public jump: Jump
    public turbo: (turboOn: number) => void

    public draw: (context: CanvasRenderingContext2D) => void

    constructor() {
        this.position = new Vec2(0, 0)
        this.velocity = new Vec2(0, 0)
        this.size = new Vec2(0, 0)
        this.traits = []
    }

    public addTrait = (trait: Trait) => {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    public obstruct = (side: Symbol) => {
        this.traits.forEach(trait => {
            trait.obstruct(this, side)
        })
    }

    public update = (deltaTime: number) => {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}
