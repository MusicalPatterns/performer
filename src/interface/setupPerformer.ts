import { BEGINNING, Ms, noop, to } from '@musical-patterns/utilities'
import { computeSampleData } from '../preparation'
import { activateContextInMobileBrowserEnvironments, OnUpdate, setupClock, setupTimeControls } from '../setup'
import { Voice } from '../types'
import { play } from './play'
import { setVoices } from './setVoices'
import { SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: {
    onUpdate?: OnUpdate,
    segnoTime: Ms,
    totalDuration: Ms,
    voices?: Voice[],
}) => Promise<void> =
    async (parameters: SetupPerformerParameters = {}): Promise<void> => {
        const { onUpdate = noop, voices, segnoTime = BEGINNING, totalDuration = to.Ms(0) } = parameters

        activateContextInMobileBrowserEnvironments()
        setupTimeControls({ onUpdate, totalDuration, segnoTime })
        computeSampleData()
        setupClock()

        if (voices) {
            await setVoices(voices)
            play()
        }
    }

export {
    setupPerformer,
}
