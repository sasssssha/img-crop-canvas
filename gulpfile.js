const gulp     = require('gulp'),
			sass     = require('gulp-sass'),
			bsync    = require('browser-sync')
			prefixes = require('gulp-autoprefixer');

gulp.task('scss',() => {
	return gulp.src('app/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(prefixes(['last 15 versions', '> 1%', 'ie 8']))
	.pipe(gulp.dest('app/css'))
	.pipe(bsync.reload({stream:true}));
});

gulp.task('watch',['bsync','scss'],() => {
	gulp.watch('app/sass/*.scss',['scss']);
	gulp.watch('app/*.html', bsync.reload)
	gulp.watch('app/js/*.js', bsync.reload)
});

gulp.task('bsync',() => {
	bsync({
		server:{
			baseDir:'app'
		},
		notify:false
	});
});
	