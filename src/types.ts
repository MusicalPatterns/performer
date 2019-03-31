import { Ms, Ordinal } from '@musical-patterns/utilities'
import { SoundToPlay, StartSound, StopSound } from './performance'
import { SourceRequest } from './preparation'

interface PreparedVoice {
    nextStart: Ms,
    nextStop: Ms,
    soundIndex: Ordinal,
    sounds: Sound[],
    source: Source,
    wrapIndex: Ordinal,
}

interface Voice {
    sounds?: Sound[],
    sourceRequest?: SourceRequest,
    wrapIndex?: Ordinal,
}

interface Sound extends SoundToPlay {
    duration: Ms,
    sustain: Ms,
}

interface Source {
    startSound: StartSound,
    stopSound: StopSound,
}

export {
    PreparedVoice,
    Voice,
    Sound,
    Source,
}
