import { Vec2 } from './Math'
import { Trait } from './Trait'
import { Jump } from '../Traits/Jump'
import { Run } from '../Traits/Run'
import { BoundingBox } from './BoundingBox'
import { PendulumWalk } from '../Traits/PendulumWalk'
import { Stomper } from '../Traits/Stomper'
import { Killable } from '../Traits/Killable'
import { Level } from './Level'

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    RIGHT: Symbol('right'),
    LEFT: Symbol('left'),
}

export class Entity {
    public position: Vec2
    public velocity: Vec2
    public size: Vec2
    public traits: Trait[]
    public run?: Run
    public jump?: Jump
    public boundingBox: BoundingBox
    public turbo?: (turboOn: number) => void
    public lifetime: number
    public offset: Vec2
    public pendulumWalk?: PendulumWalk
    public stomper?: Stomper
    public killable?: Killable

    constructor() {
        this.position = new Vec2(0, 0)
        this.velocity = new Vec2(0, 0)
        this.size = new Vec2(0, 0)
        this.offset = new Vec2(0, 0)
        this.boundingBox = new BoundingBox(this.position, this.size, this.offset)
        this.traits = []
        this.lifetime = 0
    }

    public addTrait = (trait: Trait) => {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    // tslint:disable-next-line:no-empty
    public draw = (context: CanvasRenderingContext2D) => {}

    public obstruct = (side: Symbol) => {
        this.traits.forEach(trait => {
            trait.obstruct(this, side)
        })
    }

    public collides = (candidate: Entity) => {
        this.traits.forEach(trait => {
            trait.collides(this, candidate)
        })
    }

    public update = (deltaTime: number, level: Level) => {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level)
        })

        this.lifetime += deltaTime
    }
}
