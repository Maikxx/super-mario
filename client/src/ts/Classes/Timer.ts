export class Timer {
    public update: (time: number) => void
    public updateProxy: (time: number) => void

    constructor(deltaTime: number = (1 / 60)) {
        let accumulatedTime = 0
        let lastTime = 0

        this.updateProxy = (time: number) => {
            accumulatedTime += (time - lastTime) / 1000

            // Temp fix for memory issues
            if (accumulatedTime > 1) {
                accumulatedTime = 1
            }

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime)
                accumulatedTime -= deltaTime
            }

            lastTime = time
            this.enqueue()
        }
    }

    public enqueue = () => {
        requestAnimationFrame(this.updateProxy)
    }

    public start = () => {
        this.enqueue()
    }
}
