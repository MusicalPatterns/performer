import { noop } from '@musical-patterns/utilities'
import { loadAllSamples } from '../performance'
import { activateContextInMobileBrowserEnvironments, setupThreadsListener, setupTimeControls } from '../setup'
import { enableImmersiveAudio } from './enableImmersiveAudio'
import { restart } from './restart'
import { togglePaused } from './togglePaused'
import { SetupPerformerParameters } from './types'

const setupPerformer: (setupPerformerParameters: SetupPerformerParameters) => void =
    ({ onUpdate = noop, autoStart }: SetupPerformerParameters): void => {
        loadAllSamples()
        activateContextInMobileBrowserEnvironments()
        setupThreadsListener()
        setupTimeControls(onUpdate)

        if (autoStart) {
            if (autoStart.vrb) {
                enableImmersiveAudio({ vrb: autoStart.vrb })
            }

            restart(autoStart.threadSpecs)
            togglePaused()
        }
    }

export {
    setupPerformer,
}
