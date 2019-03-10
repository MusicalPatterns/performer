import { elementExists } from '@musical-patterns/utilities'
import { page } from '../setup'

describe('it compiles', () => {
    it('since worker files can be a bit finnicky, and i cannot test in node, confirm that the code compiles', async (done: DoneFn) => {
        expect(await elementExists(page, 'button'))
            .toBeTruthy()

        done()
    })
})
