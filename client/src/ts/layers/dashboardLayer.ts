import { Font } from '../loaders/fontLoader'
import { Entity } from '../Classes/Entity'

export const createDashboardLayer = (font: Font, playerEnvironment: Entity) => {
    const FIRST_LINE = font.size
    const SECOND_LINE = font.size * 2

    const coins = 13
    const world = '1-1'

    return (context: CanvasRenderingContext2D) => {
        const time = playerEnvironment.playerController && playerEnvironment.playerController.time
        const score = playerEnvironment.playerController && playerEnvironment.playerController.score

        font.print('MARIO', context, 24, FIRST_LINE)

        if (score !== undefined) {
            font.print(
                score.toString().padStart(6, '0'),
                context,
                24, SECOND_LINE
            )
        }

        font.print(`@x${coins.toString().padStart(2, '0')}`, context, 248, FIRST_LINE)

        font.print('WORLD', context, 400, FIRST_LINE)
        font.print(world, context, 408, SECOND_LINE)

        font.print('TIME', context, 580, FIRST_LINE)

        if (time !== undefined) {
            font.print(
                time.toFixed().toString().padStart(3, '0'),
                context,
                588,
                SECOND_LINE
            )
        }
    }
}
