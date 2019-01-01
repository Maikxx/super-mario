export class Timer {
    public update: (time: number) => void

    constructor(deltaTime: number = 1 / 60) {
        let accumulatedTime = 0
        let lastTime = 0

        this.update = (time: number) => {
            accumulatedTime += (time - lastTime) / 1000

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime)
                accumulatedTime -= deltaTime
            }

            lastTime = time
            this.enqueue()
        }
    }

    public enqueue = () => {
        requestAnimationFrame(this.update)
    }

    public start = () => {
        this.enqueue()
    }
}
