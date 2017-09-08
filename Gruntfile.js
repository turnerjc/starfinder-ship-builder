module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// minify JS
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				output: {
					quote_style: 0
				}
			},
			build: {
				src: 'js/script.js',
				dest: 'app/js/script.js'
			}
		},
		// minify CSS
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'app/css/style.css': 'css/style.css'
				}
			}
		},
		// minify JSON
		minjson: {
			compile: {
				files: {
					'app/data/ship-builder.json': 'data/ship-builder.json'
				}
			}
		},
		// minify HTML
		htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'app/index.html': 'index.html'     // 'destination': 'source'
				}
			}
		},
		// Watch
		watch: {
			scripts: {
				files: ['js/script.js', 'css/style.css', 'data/ship-builder.json', 'index.html'],
				tasks: ['uglify', 'cssmin', 'minjson', 'htmlmin'],
				options: {
					/*
					livereload: {
						host: 'localhost',
						port: 9000
					}
					*/
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-minjson');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'cssmin', 'minjson', 'htmlmin']);
	grunt.registerTask('watch', ['watch']);

};