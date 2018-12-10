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
            const { homePosition, threadSpecs, vrb } = autoStart
            if (vrb) {
                enableImmersiveAudio({ vrb, homePosition })
            }

            await perform(threadSpecs)
            togglePaused()
        }
    }

export {
    setupPerformer,
}
