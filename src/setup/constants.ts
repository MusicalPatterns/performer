// tslint:disable no-magic-numbers

import { MILLISECONDS_PER_SECOND } from '@musical-patterns/utilities'

const TARGET_FPS: number = 120
const TIME_STEP: number = MILLISECONDS_PER_SECOND / TARGET_FPS

export {
    TIME_STEP,
}
