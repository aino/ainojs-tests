var gulp = require('gulp')
var gutil = require('gulp-util')
var fs = require('fs')
var es = require('event-stream')
var browserify = require('browserify')
var map = require('vinyl-map')
var source = require('vinyl-source-stream')
var buffer = require('gulp-buffer')
var concat = require('gulp-concat')
var path = require('path')
var http = require('http')
var ecstatic = require('ecstatic')

var LIBS = ["react", "jquery", "underscore", "backbone"]
var DIR = 'tests'
var BUILD = 'build'

var gulpBrowserify = function(options, bundleOptions, commands) {
  var b
  options.extensions || (options.extensions = ['.js'])
  bundleOptions || (bundleOptions = {})
  b = browserify(options)

  for ( cmd in commands ) {
    values = commands[cmd]
    if ( typeof values === 'string' ) values = [values]
    values.forEach(function(value) {
      b[cmd](value)
    })
  }
  return b.bundle(bundleOptions)
}

var lib = function() {
  gutil.log('Building libs')
  return gulpBrowserify({
    noParse: ['jquery','underscore','backbone']
  },{},{
    require: LIBS
  }).pipe(source())
    .pipe(buffer())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(BUILD))
}

var build = function(files) {
  var tasks = []
  gutil.log('Building testfiles: '+files)
  files.forEach(function(name) {
    var src = path.join(__dirname, DIR, name)
    var proj = name.replace(/\.js/,'')
    var dst = proj + '.html'
    var css = path.join('./', '../', 'ainojs-'+proj, proj+'.css')
    var cssFile
    if( fs.existsSync(css) ) {
      var data = fs.readFileSync(css)
      tasks.push(
        gulp.src(css).pipe(gulp.dest(BUILD))
      )
      cssFile = proj+'.css'
    }
    gutil.log('Compiling to: '+dst)
    tasks.push(
      gulpBrowserify({
        entries: src
      },{
        debug: false
      },{
        exclude: LIBS,
        transform: ['reactify']
      })
      .on('error', function(trace) {
        console.error(trace)
        fs.writeFileSync(path.join(BUILD, dst), trace)
      })
      .pipe(source())
      .pipe(buffer())
      .pipe(map(function(data, file) {
        var script = data.toString()
        var head = script.match(/\/\*HEAD((.|\n)+?)\*\//)
        var inject = head && head[1] ? head[1] : ''
        var link = cssFile ? '<link rel="stylesheet" href="'+cssFile+'">' : ''

        return '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">'+
               '<title>Test for '+name+'</title>'+link+inject+'<script src="lib.js"></script></head>'+
               '<body><script>'+script+'</script></body></html>'
      }))
      .pipe(concat(dst))
      .pipe(gulp.dest(BUILD))
    )
  })
  return es.concat.apply(this, tasks)
}

var dispatch = function(file) {
  if ( file )
    return build([file])
  var files = []
  fs.readdir(DIR, function(err, list) {
    list.forEach(function(name) {
      if(/\.js$/.test(name))
        files.push(name)
    })
    build(files)
  })
}

gulp.task('test', function() {
  var handler = function(event) {
    var file = path.basename(event.path)
    gutil.log('File '+file+' was '+event.type+', running tasks...')
    dispatch(file.replace(/\.[a-z]{0,4}$/,'.js'))
  }
  gulp.watch( DIR+'/*.js', handler )
  fs.readdir(DIR, function(err, list) {
    list.forEach(function(name) {
      var f = path.join(
        '../', 
        'ainojs-'+path.basename(name, '.js'), 
        path.basename(name, '.js')+'.*'
      );
      /\.js$/.test(name) && gulp.watch( f, handler )
    })
  })
  http.createServer(
    ecstatic({ root: __dirname+'/build', autoIndex: true })
  ).listen(8000)
  dispatch()
  lib()
  gutil.log('Tests listening for changes. Server running at http://127.0.0.1:8000')
})