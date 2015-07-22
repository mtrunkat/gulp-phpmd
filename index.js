var gutil = require('gulp-util')
var through = require('through2')
var exec = require('child_process').exec

/**
 * Builds shell command for PHPMD according to specified options.
 */
var buildCommand = function(filepath, opt) {
  var opt = opt || {}
  var command = opt.bin || 'phpmd';

  command += ' ' + filepath; 

  if (opt.hasOwnProperty('format')) {
    command += ' ' + opt.format + ' '
  }

  if (opt.hasOwnProperty('ruleset')) {
    command += ' ' + opt.ruleset + ' '
  }

  if (opt.hasOwnProperty('minimumpriority')) {
    command += ' --minimumpriority="' + opt.minimumpriority + '"'
  }

  if (opt.hasOwnProperty('strict')) {
    command += ' --strict'
  }

  return command
}

var phpmdPlugin = function(options) {
  return through.obj(function(file, enc, callback) {
    var stream = this

    if (file.isNull()) {
      stream.push(file)
      callback()

      return
    }

    if (file.isStream()) {
      stream.emit('error', new gutil.PluginError('gulp-phpmd', 'Streams are not supported'))
      callback()

      return
    }

    // Run PHPMD
    var phpmd = exec(buildCommand(file.path, options), function(error, stdout, stderr) {
      var report = {
        error: false,
        output: ''
      }

      if (error) {
        // Something went wrong. Attach report to the file to allow
        // reporters do their job.
        report.error = error
        report.output = stdout
      }

      file.phpmdReport = report
      stream.push(file)
      callback()
    })

    // Pass content of the file as STDIN to PHPMD
    phpmd.stdin.write(file.contents)
    phpmd.stdin.end()
  })
}

// Attach reporters loader to the plugin.
phpmdPlugin.reporter = require('./reporters')

module.exports = phpmdPlugin
