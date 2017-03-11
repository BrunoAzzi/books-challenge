var browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	del = require('del'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	newer = require('gulp-newer'),
	sourcemaps = require('gulp-sourcemaps'),
	tslint = require('gulp-tslint'),
	typescript = require('gulp-typescript'),
	runSequence = require('run-sequence'),
	tscConfig = require('./tsconfig.json'),
	sysBuilder = require('systemjs-builder'),
	reload = browserSync.reload;

var tsProject = typescript.createProject('tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function() {
	return del(['dist/*.html', 'dist/*.js', 'dist/*.js.map', 'dist/app', 'dist/components', 'dist/directives', 'dist/helpers', 'dist/lib', 'dist/services', '!dist/node_modules/**/*']);
});

gulp.task('copy:nodemodules', function() {
	return gulp.src(['node_modules/@angular/**/*', 'node_modules/ng2-pagination/**/*', 'node_modules/@angular/**/*', 'node_modules/rxjs/**/*', 'node_modules/angular-in-memory-web-api/**/*', '!node_modules/**/*.tlog', '!node_modules/**/*.png', '!node_modules/**/*.jpg', '!node_modules/**/*.md', '!node_modules/**/*.txt', '!node_modules/**/LICENSE', '!node_modules/**/license', '!node_modules/**/*.markdown', '!node_modules/**/example/**/*', '!node_modules/**/examples/**/*', '!node_modules/**/test/**/*', '!node_modules/**/benchmark/**/*', '!node_modules/**/doc/**/*', '!node_modules/**/docs/**/*', '!node_modules/**/testData/**/*', '!node_modules/**/build/Debug/**/*', '!node_modules/**/build/deps/**/*'], {
			base: 'node_modules',
		})
		.pipe(newer('dist/node_modules/'))
		.pipe(gulp.dest('dist/node_modules'));
});


// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:css', function() {
	return gulp.src(['app/css/*.css'])
		.pipe(concat('all.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy:assets', function() {
	return gulp.src(['app/templates/**/*', 'index.html', 'systemjs.config.js', '!app/**/*.ts'], {
			base: './'
		})
		.pipe(gulp.dest('dist'));
});

// copy dependencies
gulp.task('copy:libs', function() {
	return gulp.src([
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/systemjs/dist/system.src.js'
		])
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('dist/lib'));
});

// linting
gulp.task('tslint', function() {
	return gulp.src('app/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});

// TypeScript compile
gulp.task('compile', function() {
	return tsProject.src()
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('bundle:js', function() {
  	var builder = new sysBuilder('dist', './systemjs.config.js');
  	return builder.buildStatic('app', 'dist/app.min.js');
});

gulp.task('clean:bundle', function() {
	return del(['!dist/*.html', 'dist/*.js', '!dist/*.min.js', 'dist/*.js.map', '!dist/app', 'dist/components', 'dist/directives', 'dist/helpers', '!dist/lib', 'dist/services', 'dist/node_modules']);
});

// Run browsersync for development
gulp.task('serve', ['complete-build'], function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch(['app/**/*', 'index.html'], ['buildAndReload']);
});

gulp.task('complete-build', function() {
	runSequence('clean', 'compile', 'copy:libs', 'copy:css', 'copy:assets',  'copy:nodemodules', 'bundle:js', 'clean:bundle');
});

gulp.task('buildAndReload', ['complete-build'], reload);
gulp.task('default', ['complete-build']);
