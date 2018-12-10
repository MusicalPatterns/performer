import { noop } from '@musical-patterns/utilities'
import { activateContextInMobileBrowserEnvironments, setupTimeControls } from '../setup'
import { loadAllSamples } from '../voice'
import { enableImmersiveAudio } from './enableImmersiveAudio'
import { perform } from './perform'
import { togglePaused } from './togglePaused'
import { SetupPerformerParameters } from './types'

const setupPerformer: (setupPerformerParameters: SetupPerformerParameters) => void =
    ({ onUpdate = noop, autoStart }: SetupPerformerParameters): void => {
        loadAllSamples()
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)

        if (autoStart) {
            if (autoStart.vrb) {
                enableImmersiveAudio({ vrb: autoStart.vrb })
            }

            perform(autoStart.threadSpecs)
            togglePaused()
        }
    }

export {
    setupPerformer,
}
