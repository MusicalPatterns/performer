import snapshot from '@musical-patterns/pattern-template'
import { setupPerformer } from '../src'

setupPerformer({
    autoStart: {
        threadSpecs: snapshot,
    },
})
    .then()
    .catch()
