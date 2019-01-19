import { Vec2 } from './Math'
import { Trait } from './Trait'
import { Jump } from '../Traits/Jump'
import { Run } from '../Traits/Run'
import { BoundingBox } from './BoundingBox'
import { PendulumMove } from '../Traits/PendulumMove'
import { Stomper } from '../Traits/Stomper'
import { Killable } from '../Traits/Killable'
import { Level } from './Level'
import { ResolvedTile } from '../../types/Levels'
import { Solid } from '../Traits/Solid'
import { PlayerController } from '../Traits/PlayerController'

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
    public pendulumMove?: PendulumMove
    public stomper?: Stomper
    public killable?: Killable
    public behaviour?: any
    public solid?: Solid
    public playerController?: PlayerController

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

    public finalize = () => {
        this.traits.forEach(trait => trait.finalize())
    }

    public obstruct = (side: Symbol, match?: ResolvedTile) => {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match)
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
