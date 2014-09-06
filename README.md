# gulp-phpmd [![NPM version](https://badge.fury.io/js/gulp-phpmd.png)](https://www.npmjs.org/package/gulp-phpmd)

> A gulp plugin for running [PHP Mess Detector](https://github.com/squizlabs/PHP_CodeSniffer).

Derivative work of Dmitriy S. Simushev's [gulp-phpcs](https://github.com/JustBlackBird/gulp-phpcs)
##Requirements
 - [PHP Mess Detector](https://github.com/squizlabs/php_codesniffer#installation)

##Installation
```shell
npm install gulp-phpmd --save-dev
```

## Usage

```js
var gulp = require('gulp');
var phpmd = require('gulp-phpmd');

gulp.task('default', function () {
    return gulp.src(['src/**/*.php', '!src/vendor/**/*.*'])
        // Validate code using PHP Mess Detector
        .pipe(phpmd({
            bin: 'src/vendor/bin/phpmd',
            format: 'text',
        }))
        // Log all problems that was found
        .pipe(phpmd.reporter('log'));
});
```


## API

### phpmd(options)

#### options.bin

Type: `String`

Default: `'phpmd'`

PHP Mess Detector executable.

#### options.ruleset

Type: `String`

The format of the report, for multiple formats just use a comma separated
string.

#### options.ruleset

Type: `String`

The ruleset to check against

#### options.minimumpriority

Type: `String`

pass --mininumpriority to phpmd

#### options.strict

Type: `String`

pass --strict to phpmd

### phpmd.reporter(name)

Loads one of the reporters that shipped with the plugin (see below).

#### name

Type: `String`

The name of the reporter that should be loaded.


## Reporters
The plugin only passes files through PHPMD. To process the results of
the check one should use a reporter. Reporters are plugins too, so one can pipe
a files stream to them. Several reporters can be used on a stream, just like
any other plugins.

These reporters are shipped with the plugin:

1. Fail reporter - fails if a problem was found. Use `phpmd.reporter('fail')`
to load it.

2. Log reporter - outputs all problems to the console. Use
`phpmd.reporter('log')` to load it.


## License

[MIT](http://opensource.org/licenses/MIT) © Ryan Kois
