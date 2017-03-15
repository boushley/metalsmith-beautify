var debug = require('debug')('metalsmith-beautify'),
    _ = require('lodash'),
    jsBeautify = require('js-beautify'),
    extname = require('path').extname,
    htmlBeautify = jsBeautify.html,
    cssBeautify = jsBeautify.css;

var TYPES = ['js', 'css', 'html'];

// Expose `plugin`
module.exports = plugin;

/**
 * Metalsmith plugin to beautify HTML/JS
 *
 * @param {Object} [options]
 * @return {Function}
 */
function plugin (options) {
    options = options || {};

    var defaults = {
        indent_size: 1,
        indent_char: "	",
        preserve_newlines: true,
        max_preserve_newlines: 1,
        brace_style: "collapse",
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: true,
        break_chained_methods: false,
        eval_code: false,
        unescape_strings: false,
        wrap_line_length: 160
    };

    var dos = {}, compiledOptions = {};

    _.each(TYPES, function (type) {
        dos[type] = options[type] !== false;
        compiledOptions[type] = _.assign(defaults, options, options[type]);
    });

    return function (files, metalsmith, done){
        Object.keys(files).forEach(function(file){
            debug('checking file: %s', file);
            var data = files[file],
                formatted;

            if (dos.html && isHtml(file)) {
                debug('processing file as html: %s', file);
                formatted = htmlBeautify(data.contents.toString(), compiledOptions.html);
            } else if (dos.js && isJs(file)) {
                debug('processing file as js: %s', file);
                formatted = jsBeautify(data.contents.toString(), compiledOptions.js);
            } else if (dos.css && isCss(file)) {
                debug('processing file as css: %s', file);
                formatted = cssBeautify(data.contents.toString(), compiledOptions.css);
            } else if (dos.html && isMarkdown(file)) {
                console.warn('Found Markdown file when trying to beautify HTML, you should run this plugin after the markdown plugin.');
            }

            if (formatted) {
                data.contents = new Buffer(formatted);
            }
        });
        done();
    };
}

/**
 * Check if a `file` is the specified type
 *
 * @param {String} file
 * @return {Boolean}
 */
function isMarkdown (file) {
    return /\.md|\.markdown/.test(extname(file));
}
function isJs (file) {
    return /\.js/.test(extname(file));
}
function isHtml (file) {
    return /\.html|\.htm/.test(extname(file));
}
function isCss (file) {
    return /\.css/.test(extname(file));
}
