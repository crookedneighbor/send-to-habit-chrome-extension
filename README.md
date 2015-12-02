Send To Habitica
________________

Unofficial Chrome extension for sending To-Dos to habitica from web pages

## Development

### Setup

```bash
$ npm i
$ npm run build:watch
```

### Writing

The javascript, styles and views are located in the `src` directory. They are compiled automatically by running the `build:watch` command above.

The javascript is written in [ES2015](http://babeljs.io/docs/learn-es2015/) and transpiled via [Babelify](https://github.com/babel/babelify).

The styles are written in [Sass](http://sass-lang.com/).

The views are written in [Jade](http://jade-lang.com/).

### Running Dev Version of Extension

You can [load the unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked). Load the `extension` folder to properly install it.

## Tests

```bash
$ npm t
```
