import { SetupPerformerParameters } from '../index'
import { loadAllSamples } from '../performance'
import { activateContextInMobileBrowserEnvironments, setupThreadsListener, setupTimeControls } from '../setup'

const setupPerformer: (setupPerformerParameters: SetupPerformerParameters) => void =
    ({ onUpdate }: SetupPerformerParameters): void => {
        loadAllSamples()
        activateContextInMobileBrowserEnvironments()
        setupThreadsListener()
        setupTimeControls(onUpdate)
    }

export {
    setupPerformer,
}
