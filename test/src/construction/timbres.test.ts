import { OscillatorName, SampleName } from '../../../src/indexForTest'

describe('timbres', () => {
    it('all timbres are accessible, because there is no overlap between oscillators and samples, such that the sample version of that timbre name would override the oscillator version (or vice versa)', () => {
        Object.keys(OscillatorName)
            .forEach((oscillatorName: string): void => {
                expect(oscillatorName in SampleName)
                    .toBeFalsy(`${oscillatorName} is the name of both an oscillator timbre and a sample timbre. Please rename one or the other.`)
            })
    })
})
