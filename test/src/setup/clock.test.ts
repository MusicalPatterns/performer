import { page } from '../../setup'

describe('clock', () => {
    it('since worker files can be a bit finnicky, and i cannot test in node, confirm that the code compiles', async (done: DoneFn) => {
        expect(await page.waitForSelector('button'))
            .toBeTruthy()

        done()
    })
})
