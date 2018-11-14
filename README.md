# Musical Patterns Performer

given a compiled pattern, this will render it to audio

## usage

`npm i @musical-patterns/performer`

Then, in your source code,

```
import { setupPerformer } from '@musical-patterns/performer'

const performer: HTMLDivElement = setupPerformer()
```

You don't need to put the performer on the page if you don't want,
though at this point you wouldn't then be able to start or stop the music, or enable immersive audio.

If you're working in React, try appending this `div` as a child using a `ref`.

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
