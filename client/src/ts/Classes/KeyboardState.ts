const PRESSED = 1
const RELEASED = 0

export class KeyboardState {
    public keyStates: Map<string, number>
    public keyMap: Map<string, (keyState: number) => void>

    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map()

        // Holds the callback functions for a key code
        this.keyMap = new Map()
    }

    public addMapping = (code: string, callback: (keyState: number) => void) => {
        this.keyMap.set(code, callback)
    }

    public handleEvent = (event: KeyboardEvent): boolean | void => {
        const { code } = event

        if (!this.keyMap.has(code)) {
            return
        }

        event.preventDefault()
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED

        if (this.keyStates.get(code) === keyState) {
            return
        }

        this.keyStates.set(code, keyState)
        const mappedKey = this.keyMap.get(code)

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
