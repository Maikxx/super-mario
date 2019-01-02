import { Camera } from '../ts/Classes/Camera'

export type CompositorLayer = (context: CanvasRenderingContext2D, camera: Camera) => void
