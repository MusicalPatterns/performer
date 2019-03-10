import { Ms } from '@musical-patterns/utilities'
import { prepareVoices } from '../../preparation'
import { Action, ImmutableState, StateKey, store } from '../../state'
import { PreparedVoice, Voice } from '../../types'

const buildSetTimeActions: (timePosition: Ms) => Promise<Action[]> =
    async (timePosition: Ms): Promise<Action[]> => {
        const state: ImmutableState = store.getState()

        const voices: Voice[] = state.get(StateKey.VOICES)
        const preparedVoices: PreparedVoice[] = await prepareVoices(voices, timePosition)

        return [
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
            { type: StateKey.TIME_POSITION, data: timePosition },
        ]
    }

export {
    buildSetTimeActions,
}
