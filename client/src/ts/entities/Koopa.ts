import { loadSpriteSheet } from '../loaders'
import { SpriteSheet } from '../Classes/SpriteSheet'
import { Entity } from '../Classes/Entity'
import { PendulumMove } from '../Traits/PendulumMove'
import { Trait } from '../Classes/Trait'
import { Killable } from '../Traits/Killable'

export const STATE_WALKING = Symbol('walking')
export const STATE_HIDING = Symbol('hiding')
export const STATE_PANIC = Symbol('panic')

class Behaviour extends Trait {
    public state = STATE_WALKING
    public hideTime = 0
    public hideDuration = 5
    public walkSpeed: number | null = null
    public panicSpeed = 300

    constructor() {
        super('behaviour')
    }

    public collides = (us: Entity, them: Entity) => {
        if (us.killable && us.killable.dead) {
            return
        }

        if (them.stomper) {
            if (them.velocity.y > us.velocity.y) {
                this.handleStomp(us, them)
            } else {
                this.handleNudge(us, them)
            }
        }
    }

    public handleNudge = (us: Entity, them: Entity) => {
        if (this.state === STATE_WALKING && them.killable) {
            them.killable.kill()
        } else if (us.pendulumMove && this.state === STATE_HIDING) {
            this.panic(us, them)
        } else if (this.state === STATE_PANIC) {
            const travelDirection = Math.sign(us.velocity.x)
            const impactDirection = Math.sign(us.position.x - them.position.x)

            if (travelDirection !== 0 && travelDirection !== impactDirection && them.killable) {
                them.killable.kill()
            }
        }
    }

    public handleStomp = (us: Entity, them: Entity) => {
        if (this.state === STATE_WALKING) {
            this.hide(us)
        } else if (this.state === STATE_HIDING) {
            if (us.killable) {
                us.killable.kill()
                us.velocity.set(200, -200)
                us.canCollide = false
            }
        } else if (this.state === STATE_PANIC) {
            this.hide(us)
        }
    }

    public hide = (us: Entity) => {
        us.velocity.x = 0

        if (us.pendulumMove) {
            us.pendulumMove.enabled = false

            if (this.walkSpeed === null) {
                this.walkSpeed = us.pendulumMove.speed
            }
        }

        this.hideTime = 0
        this.state = STATE_HIDING
    }

    public panic = (us: Entity, them: Entity) => {
        if (us.pendulumMove) {
            us.pendulumMove.enabled = true
            us.pendulumMove.speed = this.panicSpeed * Math.sign(them.velocity.x)
            this.state = STATE_PANIC
        }
    }

    public reveal = (us: Entity) => {
        if (us.pendulumMove) {
            us.pendulumMove.enabled = true
            this.state = STATE_WALKING
        }
    }

    public update = (us: Entity, deltaTime: number) => {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime

            if (this.hideTime > this.hideDuration) {
                this.reveal(us)
            }
        }
    }
}

export const loadKoopa = async () => {
    const sprite = await loadSpriteSheet('koopa')
    return createKoopaFactory(sprite)
}

const createKoopaFactory = (sprite: SpriteSheet) => {
    const walkAnimation = sprite.animations.get('walk')
    const wakeAnimation = sprite.animations.get('wake')

    const routeAnimation = (koopa: Entity) => {
        if (!walkAnimation) {
            return 'walk-1'
        }

        if (koopa.behaviour.state === STATE_HIDING || koopa.behaviour.state === STATE_PANIC) {
            if (koopa.behaviour && koopa.behaviour.hideTime > 3 && wakeAnimation) {
                return wakeAnimation(koopa.behaviour.hideTime)
            }

            return 'hiding'
        }

        return walkAnimation(koopa.lifetime)
    }

    const drawKoopa = (context: CanvasRenderingContext2D, koopa: Entity) => {
        if (!walkAnimation) {
            return
        }

        sprite.draw(routeAnimation(koopa), context, 0, 0, koopa.velocity.x < 0)
    }

    return () => {
        const koopa = new Entity()
        koopa.size.set(16, 16)
        koopa.offset.y = 8

        koopa.addTrait(new PendulumMove())
        koopa.addTrait(new Killable())
        koopa.addTrait(new Behaviour())

        koopa.draw = (context: CanvasRenderingContext2D) => drawKoopa(context, koopa)

        return koopa
    }
}
