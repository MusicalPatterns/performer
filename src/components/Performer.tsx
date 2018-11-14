import * as React from 'react'
import SpatializationEnabler from './SpatializationEnabler'
import ThreadsListener from './ThreadsListener'
import TimeControls from './TimeControls'

const Performer: () => JSX.Element =
    (): JSX.Element => (
        <div>
            <SpatializationEnabler/>
            <ThreadsListener/>
            <TimeControls/>
        </div>
    )

export default Performer
