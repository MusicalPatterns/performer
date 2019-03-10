import { Ms } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { prepareVoices } from '../preparation'
import { ImmutableState, StateKey, store } from '../state'
import { PreparedVoice, Voice } from '../types'
import { stopExistingVoices } from './helpers'

const setVoices: (voices: Voice[]) => Promise<void> =
    async (voices: Voice[]): Promise<void> => {
        stopExistingVoices()

        const state: ImmutableState = store.getState()
        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const preparedVoices: PreparedVoice[] = await prepareVoices(voices, timePosition)

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.VOICES, data: voices },
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
        ])
        store.dispatch(batchedAction)
    }

export {
    setVoices,
}
