import { context } from '../performance'

const activateContextInMobileBrowserEnvironments: () => void =
    (): void => {
        document.addEventListener('touchstart', async () => {
            await context.resume()
        })
    }

export {
    activateContextInMobileBrowserEnvironments,
}
