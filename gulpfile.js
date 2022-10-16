import gulp from "gulp";
import browserSync from 'browser-sync';

import { paths } from './gulp/config.js';
import { clear, copy, server, watcher } from "./gulp/tasks.js";



global.app = { gulp, paths, browserSync };


const dev = gulp.series(clear, copy, gulp.parallel(watcher, server));

gulp.task("default", dev);