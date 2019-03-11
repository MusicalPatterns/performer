import { BatchAction, batchActions } from 'redux-batched-actions'
import { prepareVoices } from '../preparation'
import { StateKey, store } from '../state'
import { PreparedVoice, Voice } from '../types'
import { stopExistingVoices } from './helpers'

const setVoices: (voices: Voice[]) => Promise<void> =
    async (voices: Voice[]): Promise<void> => {
        stopExistingVoices()

        const preparedVoices: PreparedVoice[] = await prepareVoices(voices)

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.VOICES, data: voices },
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
        ])
        store.dispatch(batchedAction)
    }

export {
    setVoices,
}
