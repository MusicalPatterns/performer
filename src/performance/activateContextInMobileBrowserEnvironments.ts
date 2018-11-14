import { context } from './context'

const activateContextInMobileBrowserEnvironments: () => void =
    (): void => {
        document.addEventListener('touchstart', async () => {
            await context.resume()
        })
    }

export {
    activateContextInMobileBrowserEnvironments,
}
