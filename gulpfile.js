const gulp     = require('gulp')
			bsync    = require('browser-sync');

gulp.task('watch',['bsync'],() => {
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
	