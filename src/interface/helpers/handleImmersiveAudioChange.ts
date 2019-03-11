import { Ms } from '@musical-patterns/utilities'
import { prepareVoices } from '../../preparation'
import { ImmutableState, StateKey, store } from '../../state'
import { PreparedVoice, Voice } from '../../types'
import { stopExistingVoices } from './stopExistingVoices'

let previousImmersiveAudioEnabled: boolean = false

const handleImmersiveAudioChange: () => Promise<void> =
    async (): Promise<void> => {
        const state: ImmutableState = store.getState()
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        if (immersiveAudioEnabled !== previousImmersiveAudioEnabled) {
            previousImmersiveAudioEnabled = immersiveAudioEnabled
            stopExistingVoices()

            const voices: Voice[] = state.get(StateKey.VOICES)
            const preparedVoices: PreparedVoice[] = await prepareVoices(voices)

            store.dispatch({ type: StateKey.PREPARED_VOICES, data: preparedVoices })
        }
    }

export {
    handleImmersiveAudioChange,
}
