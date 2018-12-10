# Musical Patterns - performer

given a compiled pattern, this will render it to audio

## usage

`npm i @musical-patterns/performer`

### setup

```
import { setupPerformer, OnUpdate } from '@musical-patterns/performer'

const onUpdate: OnUpdate = time => {
	// do whatever you wanna do with the latest time here
}

setupPerformer({ onUpdate })
```

### loading a pattern

```
import { perform, ThreadSpec } from '@musical-patterns/performer'

const threadSpecs: ThreadSpec[] = [
	// your thread specs here
]

perform(threadSpecs) // will automatically perform time whether you like it or not
```

### starting and stopping

```
import { togglePaused } from '@musical-patterns/performer'

togglePaused()
```

### enabling immersive audio

```
import { enableImmersiveAudio } from '@musical-patterns/performer'

enableImmersiveAudio()
```

If you have your own instance of Vrb ([https://www.npmjs.com/package/vrb](https://www.npmjs.com/package/vrb)) you may inject it here.
If you do not, Vrb is what will be used under the hood for WebVR and it will be automatically configured to reasonable defaults for you.

### or if you're an eager beaver

```
import { setupPerformer } from '@musical-patterns/performer'
import houndstoothtopiaTheme from '@musical-patterns/pattern-houndstoothtopia-theme'
import { buildVrb } from 'vrb'

setupPerformer({
	autoStart: {
		threadSpecs: houndstoothtopiaTheme,
		vrb: buildVrb()
	}
})

```

## samples notes

If you're going to use samples, I'm afraid you'll also need to find some way to get the samples' .wav files into your bundle.
Either way, if you don't do this, you'll see a bunch of errors in your console (urgh).
I suggest `npm i copy-webpack-plugin` and adding this to your `webpack.config.js`:

```
new CopyWebpackPlugin([{
	from: 'node_modules/@musical-patterns/performer/dist/*.wav',
	to: path.join(__dirname, './dist'),
	flatten: true,
}]),
```
