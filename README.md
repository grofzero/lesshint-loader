# Lesshint Plugin for Webpack

## Install

```console
$ npm install lesshint-webpack-plugin
```

## Usage

In your webpack configuration

```js
var LessHintPlugin = require('lesshint-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new LessHintPlugin({
          files: [
                __dirname + './source/applications/**/*.less',
                __dirname + './source/frame/**/*.less',
                __dirname + '!./source/frame/bootstrap/**/*.less',
                __dirname + './source/modules/**/*.less',
                __dirname + './source/layouts/**/*.less',
          ],
          configFile: path.resolve(__dirname, '.lesshintrc')
      })
  ],
  // ...
}
```

### Options

See [lesshint options](https://www.npmjs.com/package/lesshint#configuration), for the complete list of options.

* `configFile`: You can set the config file location for your lesshint options if not given it will look for a .lesshintrc file
* `files`: You can set the glob pattern for finding files (absolute path).
* `reporter`: You can set the reporter for lesshint. Default: `lesshint-reporter-stylish`
