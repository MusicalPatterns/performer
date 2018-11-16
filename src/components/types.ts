import { Thread } from '../index'
import { Time } from '../nominal'

interface ThreadsListenerPropsFromState {
    threads: Thread[],
}

interface ThreadsListenerPropsFromDispatch {
    resetClock: () => void,
}

interface ThreadsListenerProps extends ThreadsListenerPropsFromState, ThreadsListenerPropsFromDispatch {
}

interface TimeControlsPropsFromState {
    paused: boolean,
    time: Time,
}

interface TimeControlsPropsFromDispatch {
    togglePaused: () => void,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {
}

interface SpatializationEnablerProps {
    onClick: () => void
}

export {
    ThreadsListenerProps,
    ThreadsListenerPropsFromDispatch,
    ThreadsListenerPropsFromState,
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    SpatializationEnablerProps,
}
