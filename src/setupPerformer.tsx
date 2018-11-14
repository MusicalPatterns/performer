import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Performer } from './components'
import { activateContextInMobileBrowserEnvironments, loadAllSamples } from './performance'
import { store } from './state'

const setupPerformer: () => HTMLDivElement =
    (): HTMLDivElement => {
        loadAllSamples()
        activateContextInMobileBrowserEnvironments()

        const root: HTMLDivElement = document.createElement('div')
        store.subscribe(() => render(<Provider store={store}><Performer/></Provider>, root))
        render(<Provider store={store}><Performer/></Provider>, root)

        return root
    }

export {
    setupPerformer,
}
