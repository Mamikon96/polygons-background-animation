import { deleteAsync } from 'del';


export const copy = () => {
	return app.gulp.src(app.paths.src.files)
		.pipe(app.gulp.dest(app.paths.dist.files));
};

export const clear = () => {
	return deleteAsync(app.paths.clean);
};

export const server = (done) => {
	app.browserSync.init({
		server: {
			baseDir: `${app.paths.dist.html}`
		},
		notify: false,
		port: 3000
	});
};

export const watcher = () => {
	app.gulp.watch(app.paths.watch.files, copy);
};