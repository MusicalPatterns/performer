import { Cardinal, Ms, Ordinal } from '@musical-patterns/utilities'
import { SoundToPlay, StartSound, StopSound } from './performance'
import { SourceRequest } from './preparation'

interface PreparedVoice {
    nextStart: Ms,
    nextStop: Ms,
    sectionIndex: Ordinal,
    sections: SoundsSection[],
    soundIndex: Ordinal,
    source: Source,
}

interface Section {
    delayFor?: Ms,
    repetitions?: Cardinal,
    wrapAt?: Ms,
}

interface SoundsSection extends Section {
    sounds: Sound[],
}

interface Voice {
    sections?: SoundsSection[],
    sourceRequest?: SourceRequest,
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
    Section,
    SoundsSection,
}
