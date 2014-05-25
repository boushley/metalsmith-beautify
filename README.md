# metalsmith-beautify

  A [Metalsmith](http://www.metalsmith.io/) plugin to format html, css and js.

## Installation

    $ npm install metalsmith-beautify

## Config options

  You can pass general options in the options object that will be used for all types of beautification. To see what 
  options are available check the [js-beautify](https://github.com/einars/js-beautify) tool.

  For options that are specific to one language type create a nested object with that types name. To disable 
  formatting of a specific file type set that type to false.

  The three file types that are supported are html, javascript and css.

### Example Configs

  If you want to avoid formatting css and html you would pass this options object:

```json
{
    "css": false,
    "html": false
}
```
    
  If you want to use four spaces for most indentation, but only two spaces in javascript you would pass this:

```json
{
    "indent_size": 4,
    "indent_char": " ",
    "js": {
        "indent_size": 2
    }
}
```
    

## CLI Usage

  Install via npm and then add the `metalsmith-beautify` key to your `metalsmith.json` plugins with any [js-beautify](https://github.com/einars/js-beautify) options you want, like so:

```json
{
  "plugins": {
    "metalsmith-beautify": {
        "css": false,
        "preserve_newlines": false
    }
  }
}
```

## Javascript Usage

  Pass `options` to the beautify plugin and pass it to Metalsmith with the `use` method:

```js
var beautify = require('metalsmith-beautify');

metalsmith.use(beautify({
    "js": false,
    "html": {
        "wrap_line_length": 80
    }
}));
```

## License

  MIT

## Credit

The credit for the heavy lifting here goes to the [js-beautify](https://github.com/einars/js-beautify) tool.
