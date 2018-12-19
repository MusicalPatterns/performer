import snapshot from '@musical-patterns/pattern-template'
// tslint:disable-next-line:only-import-index-for-test-from-src
import { setupPerformer } from '../../src'

setupPerformer({
    autoStart: {
        threadSpecs: snapshot,
    },
})
    .then()
    .catch()
