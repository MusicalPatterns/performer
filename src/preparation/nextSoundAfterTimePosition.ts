import { apply, from, indexOfLastElement, INITIAL, isEmpty, Ms, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { Sound } from '../types'
import { NextSound } from './types'

const computeNextSoundAfterTimePosition: (sounds: Sound[], timePosition: Ms) => NextSound =
    (sounds: Sound[], timePosition: Ms): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: to.Ordinal(0), nextStart: to.Ms(0) }
        }

        let soundIndex: Ordinal = INITIAL
        let nextStart: Ms = to.Ms(0)
        while (nextStart < timePosition) {
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
    computeNextSoundAfterTimePosition,
}
