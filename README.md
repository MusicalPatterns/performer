[![Build Status](https://travis-ci.com/MusicalPatterns/performer.svg?branch=master)](https://travis-ci.com/MusicalPatterns/performer)

# Musical Patterns - Performer

Given a pattern compiled by the `@musical-patterns/compiler`, hooks it up to the Web Audio and WebXR APIs and gives you the power to play it (and pause it, etc.)

## usage

`npm i @musical-patterns/performer`

### setup

```
import { setupPerformer, OnUpdate } from '@musical-patterns/performer'

const onUpdate: OnUpdate = time => {
	// do whatever you wanna do with the latest time here, such as update some display
}

await setupPerformer({ onUpdate })
```

This will ensure your browser is ready to start playing!

### loading a pattern

```
import { setVoices, Voice } from '@musical-patterns/performer'

const voices: Voice[] = [
	// your voices here
]

await setVoices(voices)
```

`setVoices` only sets what is to be performed. It does not start playing it yet.

### starting and stopping

```
import { play, pause, stop } from '@musical-patterns/performer'

# set paused to true
pause()
# set paused to false
play()
# or set paused to false plus reset the time to 0
await stop()

```

### enabling immersive audio

```
import { enableImmersiveAudio } from '@musical-patterns/performer'
import { buildVrb } from 'vrb'

const homePosition: Coordinate = [ 5, 4, 3 ]
const onReady: VoidFunction = () => {
	// do whatever you want once the VR device is ready
}
const onNoVr: VoidFunction = () => {
	// do whatever you want once it is determined that your system does not support VR
}

const toggleImmersiveAudioHandler: VoidFunction = enableImmersiveAudio({ vrb, homePosition, onReady, onNoVr })

const toggleImmersiveAudioButton = document.createElement('div')
toggleImmersiveAudioButton.innerText = 'Toggle Immersive Audio'
toggleImmersiveAudioButton.addEventListener('click', toggleImmersiveAudioHandler)
document.body.appendChild(toggleImmersiveAudioButton)
```

If you have your own instance of Vrb ([https://www.npmjs.com/package/vrb](https://www.npmjs.com/package/vrb)) you may inject it here.
If you do not, Vrb is what will be used under the hood for WebVR and it will be automatically configured to reasonable defaults for you.

### or if you're an eager beaver

If you pass `voices` to the setup, it will automatically start playing them.

```
import { compilePattern } from '@musical-patterns/compiler'
import { setupPerformer, Voice } from '@musical-patterns/performer'
import { pattern } from '@musical-patterns/pattern-houndstoothtopia-theme'

const { voices }: CompiledPattern = await compilePattern(pattern)
await setupPerformer({
	voices,
})

```

### jumping around in time

```
import { setTime } from '@musical-patterns/performer'

await setTime(14000)

```

It will keep playing if it was playing already.
