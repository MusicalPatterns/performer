import { apply, from, indexOfLastElement, INITIAL, Ms, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { Sound } from '../types'
import { InitialSound } from './types'

const calculateInitialSound: (sounds: Sound[], startTime: Ms) => InitialSound =
    (sounds: Sound[], startTime: Ms): InitialSound => {
        let soundIndex: Ordinal = INITIAL
        let nextStart: Ms = to.Ms(0)
        while (nextStart < startTime) {
            const nextSound: Sound = apply.Ordinal(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(duration))
            soundIndex = apply.Translation(soundIndex, NEXT)

            if (from.Ordinal(soundIndex) > indexOfLastElement(sounds)) {
                soundIndex = INITIAL
            }
        }

        return { soundIndex, nextStart }
    }

export {
    calculateInitialSound,
}
