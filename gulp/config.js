import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const srcPath = './src';
const distPath = './dist';


export const paths = {
	dist: {
		files: `${distPath}/`,
		html: `${distPath}/`,
		js: `${distPath}/`,
		css: `${distPath}/`
	},
	src: {
		files: `${srcPath}/**/*.*`,
		html: `${srcPath}/*.html`,
		js: `${srcPath}/*.js`,
		css: `${srcPath}/*.css`
	},
	watch: {
		files: `${srcPath}/**/*.*`,
		html: `${srcPath}/**/*.html`,
		js: `${srcPath}/**/*.js`,
		css: `${srcPath}/**/*.css`
	},
	clean: `${distPath}/*/`
};