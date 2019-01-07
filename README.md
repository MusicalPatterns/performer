[![Build Status](https://travis-ci.com/MusicalPatterns/performer.svg?branch=master)](https://travis-ci.com/MusicalPatterns/performer)

# Musical Patterns - Performer

Given a compiled pattern, this will first construct everything it needs to render it to audio with as few calculations during rendering as possible;
then it will render it.

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

### loading a pattern

```
import { perform, ThreadSpec } from '@musical-patterns/performer'

const threadSpecs: ThreadSpec[] = [
	// your thread specs here
]

await perform(threadSpecs)
```

### starting and stopping

```
import { togglePaused } from '@musical-patterns/performer'

togglePaused()
```

### enabling immersive audio

```
import { enableImmersiveAudio } from '@musical-patterns/performer'
import { buildVrb } from 'vrb'

const homePosition: Coordinate = [ 5, 4, 3 ]

const enterImmersiveAudioHandler: VoidFunction = enableImmersiveAudio({ vrb, homePosition })

const enterImmersiveAudioButton = document.createElement('div')
enterImmersiveAudioButton.innerText = 'Enter Immersive Audio'
enterImmersiveAudioButton.addEventListener('click', enterImmersiveAudioHandler)
document.body.appendChild(enterImmersiveAudioButton)
```

If you have your own instance of Vrb ([https://www.npmjs.com/package/vrb](https://www.npmjs.com/package/vrb)) you may inject it here.
If you do not, Vrb is what will be used under the hood for WebVR and it will be automatically configured to reasonable defaults for you.

### or if you're an eager beaver

If you pass `threadSpecs` to the setup, it will automatically start with them.

```
import { setupPerformer } from '@musical-patterns/performer'
import { snapshot } from '@musical-patterns/pattern-houndstoothtopia-theme'

await setupPerformer({
	threadSpecs: snapshot,
})

```

## samples notes

If you want to use samples, I'm afraid you'll need to find some way to get the samples' .wav files into your bundle.
I suggest `npm i copy-webpack-plugin` and adding this to your `webpack.config.js`:

```
new CopyWebpackPlugin([{
	from: 'node_modules/@musical-patterns/performer/dist/*.wav',
	to: path.join(__dirname, './dist'),
	flatten: true,
}]),
```
