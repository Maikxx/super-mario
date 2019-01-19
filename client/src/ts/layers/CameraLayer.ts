import { Camera } from '../Classes/Camera'

export const createCameraLayer = (cameraToDraw: Camera) => {
    return (context: CanvasRenderingContext2D, fromCamera: Camera) => {
        context.strokeStyle = 'purple'
        context.beginPath()
        context.rect(
            cameraToDraw.position.x - fromCamera.position.x,
            cameraToDraw.position.y - fromCamera.position.y,
            cameraToDraw.size.x, cameraToDraw.size.y
        )
        context.stroke()
    }
}
