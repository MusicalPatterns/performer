enum OscillatorName {
    BASS = 'BASS',
    BASS_AMP_360 = 'BASS_AMP_360',
    BASS_FUZZ = 'BASS_FUZZ',
    BASS_FUZZ_2 = 'BASS_FUZZ_2',
    BASS_SUB_DUB = 'BASS_SUB_DUB',
    BASS_SUB_DUB_2 = 'BASS_SUB_DUB_2',
    BRASS = 'BRASS',
    BRIT_BLUES = 'BRIT_BLUES',
    BRIT_BLUES_DRIVEN = 'BRIT_BLUES_DRIVEN',
    BUZZY_1 = 'BUZZY_1',
    BUZZY_2 = 'BUZZY_2',
    CELESTE = 'CELESTE',
    CHORUS_STRINGS = 'CHORUS_STRINGS',
    DISSONANT_1 = 'DISSONANT_1',
    DISSONANT_2 = 'DISSONANT_2',
    DISSONANT_PIANO = 'DISSONANT_PIANO',
    DROPPED_SAW = 'DROPPED_SAW',
    DROPPED_SQUARE = 'DROPPED_SQUARE',
    DYNA_EP_BRIGHT = 'DYNA_EP_BRIGHT',
    DYNA_EP_MED = 'DYNA_EP_MED',
    ETHNIC_33 = 'ETHNIC_33',
    FULL_1 = 'FULL_1',
    FULL_2 = 'FULL_2',
    GUITAR_FUZZ = 'GUITAR_FUZZ',
    HARSH = 'HARSH',
    MKL_HARD = 'MKL_HARD',
    NOISE = 'NOISE',
    ORGAN_2 = 'ORGAN_2',
    ORGAN_3 = 'ORGAN_3',
    PHONEME_AH = 'PHONEME_AH',
    PHONEME_BAH = 'PHONEME_BAH',
    PHONEME_EE = 'PHONEME_EE',
    PHONEME_O = 'PHONEME_O',
    PHONEME_OOH = 'PHONEME_OOH',
    PHONEME_POP_AHHHS = 'PHONEME_POP_AHHHS',
    PIANO_OSCILLATOR = 'PIANO_OSCILLATOR',
    PULSE = 'PULSE',
    PUTNEY_WAVERING = 'PUTNEY_WAVERING',
    SAW = 'SAW',
    SINE = 'SINE',
    SQUARE = 'SQUARE',
    TB303_SQUARE = 'TB303_SQUARE',
    THROATY = 'THROATY',
    TRIANGLE = 'TRIANGLE',
    TROMBONE_OSCILLATOR = 'TROMBONE_OSCILLATOR',
    TWELVE_OP_TINES = 'TWELVE_OP_TINES',
    TWELVE_STRING_GUITAR_1 = 'TWELVE_STRING_GUITAR_1',
    WARM_SAW = 'WARM_SAW',
    WARM_SQUARE = 'WARM_SQUARE',
    WARM_TRIANGLE = 'WARM_TRIANGLE',
    WURLITZER = 'WURLITZER',
    WURLITZER_2 = 'WURLITZER_2',
}

type OscillatorNameToPeriodicWaveNameMap = { [K in OscillatorName]: string }

interface PeriodicWaveSpec {
    imag: number[],
    real: number[],
}

type GetPeriodicWave = (oscillatorName: OscillatorName) => PeriodicWave

export {
    PeriodicWaveSpec,
    OscillatorName,
    GetPeriodicWave,
    OscillatorNameToPeriodicWaveNameMap,
}
