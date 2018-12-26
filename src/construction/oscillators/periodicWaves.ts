// @ts-ignore
import * as periodicWaves from '@mohayonao/wave-tables'
import { logMessageToConsole, Maybe } from '@musical-patterns/utilities'
import { context } from '../../performance'
import { GetPeriodicWave, OscillatorName, PeriodicWaveSpec } from './types'

const sineSpec: PeriodicWaveSpec = {
    imag: [ 0, 0 ],
    real: [ 0, 1 ],
}

const getPeriodicWaveSpec: (oscillatorName: OscillatorName) => PeriodicWaveSpec =
    (oscillatorName: OscillatorName): PeriodicWaveSpec => {
        // tslint:disable-next-line:no-unsafe-any
        const periodicWaveSpec: Maybe<PeriodicWaveSpec> = periodicWaves[ oscillatorName ] as PeriodicWaveSpec

        if (!periodicWaveSpec) {
            // tslint:disable-next-line:no
            logMessageToConsole(`No periodic wave spec was found for oscillator name ${oscillatorName}. \
Defaulting to sine. Please try updating your '@musical-patterns' packages.`)

            return sineSpec
        }
        else {
            return periodicWaveSpec
        }

    }

const getPeriodicWave: GetPeriodicWave =
    (oscillatorName: OscillatorName): PeriodicWave => {

        const { real, imag } = oscillatorName === OscillatorName.SINE ?
            sineSpec :
            getPeriodicWaveSpec(oscillatorName)

        return context.createPeriodicWave(Float32Array.from(real), Float32Array.from(imag))
    }

export {
    getPeriodicWave,
}
