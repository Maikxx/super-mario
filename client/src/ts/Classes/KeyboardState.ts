const PRESSED = 1
const RELEASED = 0

export class KeyboardState {
    public keyStates: Map<number, number>
    public keyMap: Map<number, (keyState: number) => void>

    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map()

        // Holds the callback functions for a key code
        this.keyMap = new Map()
    }

    public addMapping = (keyCode: number, callback: (keyState: number) => void) => {
        this.keyMap.set(keyCode, callback)
    }

    public handleEvent = (event: KeyboardEvent): boolean | void => {
        const { keyCode } = event

        if (!this.keyMap.has(keyCode)) {
            return
        }

        event.preventDefault()
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED

        if (this.keyStates.get(keyCode) === keyState) {
            return
        }

        this.keyStates.set(keyCode, keyState)
        const mappedKey = this.keyMap.get(keyCode)

        if (mappedKey) {
            mappedKey(keyState)
        }
    }

    public listenTo = (window: Window) => {
        [ 'keydown', 'keyup' ].forEach(eventName => {
            window.addEventListener(eventName, this.handleEvent)
        })
    }
}
