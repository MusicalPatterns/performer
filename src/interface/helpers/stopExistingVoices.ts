import { ImmutableState, StateKey, store } from '../../state'
import { PreparedVoice } from '../../types'

const stopExistingVoices: () => void =
    (): void => {
        const state: ImmutableState = store.getState()
        const preparedVoices: PreparedVoice[] = state.get(StateKey.PREPARED_VOICES)
        preparedVoices.forEach((preparedVoice: PreparedVoice): void => {
            preparedVoice.source.stopSound()
        })
    }

export {
    stopExistingVoices,
}
