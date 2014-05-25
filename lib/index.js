var debug = require('debug')('metalsmith-beautify');
var _ = require('lodash');
var jsBeautify = require('js-beautify');
var htmlBeautify = jsBeautify.html;
var cssBeautify = jsBeautify.css;

var TYPES = ['js', 'css', 'html'];

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to beautify html / js
 *
 * @param {Object} options (optional)
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

    var dos = _.map(TYPES, function (type) {
        return options[type] !== false;
    });
    var options = _.map(TYPES, function (type) {
        return _.assign(defaults, options, options[type]);
    });

    return function (files, metalsmith, done){
        Object.keys(files).forEach(function(file){
            debug('checking file: %s', file);
            var data = files[file];
                str;


            if (dos.html && isHtml(file)) {
                debug('processing file as html: %s', file);
                str = htmlBeautify(data.contents.toString(), options.html);
            } else if (dos.js && isJs(file)) {
                debug('processing file as js: %s', file);
                str = jsBeautify(data.contents.toString(), options.js);
            } else if (dos.css && isCss(file)) {
                debug('processing file as css: %s', file);
                str = cssBeautify(data.contents.toString(), options.css);
            } else if (dos.html && isMarkdown(file)) {
                console.warn('Found Markdown file when trying to beautify HTML, you should run this plugin after the markdown plugin.');
            }

            if (str) {
                data.contents = new Buffer(str);
            }
        });
        done();
    };
}

/**
 * Check if a `file` is the specified type.
 *
 * @param {String} file
 * @return {Boolean}
 */

function isMarkdown (file) {
    return /\.md|\.markdown/.test(extname(file));
}
function isJs (file) {
    return /\.md|\.markdown/.test(extname(file));
}
function isHtml (file) {
    return /\.md|\.markdown/.test(extname(file));
}
function isCss (file) {
    return /\.md|\.markdown/.test(extname(file));
}
