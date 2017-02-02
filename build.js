var metalsmith		= require('metalsmith');
var define			= require('metalsmith-define');
var layout			= require('metalsmith-layouts');
var collections		= require('metalsmith-collections');
var pagination		= require('metalsmith-pagination');
var images			= require('metalsmith-project-images');
var imageResizer 	= require('metalsmith-image-resizer');
var markdown		= require('metalsmith-markdown');
var permalinks		= require('metalsmith-permalinks');
var autoprefixer	= require('metalsmith-autoprefixer');
var sass			= require('metalsmith-sass');
var uglify			= require('metalsmith-uglify');
var concat			= require('metalsmith-concat');
var updated			= require('metalsmith-updated');
var renamer 		= require('metalsmith-renamer');
var asset			= require('metalsmith-static');
var serve			= require('metalsmith-serve');
var watch			= require('metalsmith-watch');

metalsmith(__dirname)
	.source('src')
	.use(define({
		blog: {
			uri: 'http://art.edwardessing.com',
			title: 'Edward Essing Art',
			description: 'Edward Essing Art'
		},
		owner: {
			uri: 'http://edwardessing.com',
			name: 'Edward Essing'
		},
		moment: require('moment')
	}))
	.use(collections({
		pages: {
			pattern: '*.md'
		},
		posts: {
			pattern: 'posts/**/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(imageResizer({
		glob: 'posts/**/*~(detail).*',
		width: 1500,
		height: 1000
	}))
	// .use(renamer({
	// 	filesToRename: {
	// 		pattern: 'posts/**/_detail/*',
	// 		rename: function(name) {
	// 			var filename = name.replace(/\.[^/.]+$/, "")
	// 			var extension = name.split('.').pop()
	// 			return filename + ' (detail).' + extension;
	// 		}
	// 	}
	// }))
	.use(images({
		pattern: 'posts/**/*.md',
		imagesDirectory: 'images'
	}))
	.use(asset({
		src: 'assets', // relative to the working directory
		dest: 'assets' // relative to the build directory
	}))
	.use(pagination({
		'collections.posts': {
			perPage: 6,
			first: 'posts/index.html',
			layout: 'posts.jade',
			path: 'posts/:num/index.html',
			pageMetadata: {
				'title': 'Archive'
			}
		}
	}))
	.use(markdown({
		'gfm': true,
		'tables': true
	}))
	.use(permalinks({
		pattern: './:collection/:title',
		relative: false
	}))
	.use(autoprefixer())
	.use(sass({
		outputDir: function(originalPath) {
			return originalPath.replace('scss', 'css');
		}
	}))
	.use(concat({
		files: 'css/base/**/*.css',
		output: 'css/app.css'
	}))
	// .use(uglify({
	// 	order: ['js/jquery.min.js', 'js/*.js'],
	// 	concat: 'js/script.min.js',
	// 	removeOriginal: true
	// }))
	.use(layout({
		engine: 'jade',
		directory: 'layouts',
		partials: 'partials',
		default: 'post.jade',
		pattern: '**/*.html'
	}))
	.use(updated({
		filePatterns: ['posts/*']
	}))
	.use(serve({
		port: 8080,
		http_error_files: {
			404: "/404.html"
		}
	}))
	.use(watch({
		paths: {
			'src/**/*': true,
			'layouts/**/*': '**/*.md',
		},
		livereload: true
	}))
	.destination("build")
	.build(function(err) {
		if (err) {
			throw err
		}
	});