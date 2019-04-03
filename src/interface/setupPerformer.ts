import { BEGINNING, Ms, noop, to } from '@musical-patterns/utilities'
import { computeSampleData } from '../preparation'
import { activateContextInMobileBrowserEnvironments, OnUpdate, setupClock, setupTimeControls } from '../setup'
import { Voice } from '../types'
import { play } from './play'
import { setPattern } from './setPattern'
import { CompiledPattern, SetupPerformerParameters } from './types'

const defaultCompiledPattern: CompiledPattern = {
    segnoTime: BEGINNING,
    totalDuration: to.Ms(0),
    voices: [],
}

const setupPerformer: (parameters?: {
    compiledPattern?: CompiledPattern,
    onUpdate?: OnUpdate,
}) => Promise<void> =
    async (parameters: SetupPerformerParameters = {}): Promise<void> => {
        const { onUpdate = noop, compiledPattern = defaultCompiledPattern } = parameters

        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        computeSampleData()
        setupClock()

        if (compiledPattern) {
            await setPattern(compiledPattern)
            play()
        }
    }

export {
    setupPerformer,
}
