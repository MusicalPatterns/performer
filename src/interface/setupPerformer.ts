import { noop } from '@musical-patterns/utilities'
import { activateContextInMobileBrowserEnvironments, setupTimeControls } from '../setup'
import { enableImmersiveAudio } from './enableImmersiveAudio'
import { perform } from './perform'
import { togglePaused } from './togglePaused'
import { SetupPerformerParameters } from './types'

const setupPerformer: (setupPerformerParameters: SetupPerformerParameters) => Promise<void> =
    async ({ onUpdate = noop, autoStart }: SetupPerformerParameters): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)

        if (autoStart) {
            if (autoStart.vrb) {
                enableImmersiveAudio({ vrb: autoStart.vrb })
            }

            await perform(autoStart.threadSpecs)
            togglePaused()
        }
    }

export {
    setupPerformer,
}
