module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        protractor: 'grunt-protractor-runner',
        'webpack-dev-server': 'grunt-webpack',
        configureProxies: 'grunt-connect-proxy'
    });

    //require('time-grunt')(grunt);

    var browserifyAliasConfig = require('./browserify.config.js');


    var webpackPublicConfig = require('./webpack.public.config.js');
    var webpackDevConfig = require('./webpack.config.js');

    grunt.initConfig({
        grnt: {
            app: 'app',
            dist: 'dist'
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },

            proxies: [
				{
				    context: '/rest',
					host: 'illin1036', // Domain or ip
					port: 19500,
					changeOrigin: true,
					https: false,
					xforward: false
				}
            ],

            livereload: {
                options: {
                    open: true,
                    logger: 'dev',
                    base: [
						'.tmp',
						'<%= grnt.app %>',
						'!<%= grnt.app %>/components/{,*/}*.*',
						'<%= grnt.app %>/components/operational/{,*/}*.*'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        // Setup the proxy
                        //var middlewares = [require('./app/mocks/api'), require('grunt-connect-proxy/lib/utils').proxyRequest];
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= grnt.dist %>',
                    livereload: false
                }
            },
            docs: {
                options: {
                    open: true,
                    port: 9005,
                    base: 'docs',
                    keepalive: true,
                    livereload: false
                }
            }
        },

        watch: {
            sass: {
                files: ['<%= grnt.app %>/assets/styles/{,*/}*.{scss,sass}',
						    '<%= grnt.app %>/components/operational/**/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            browserifySpec: {
                files: ['<%= grnt.app %>/components/operational/**/*.spec.js'],
                tasks: ['newer:jshint', 'newer:jscs', 'browserify:spec']
            },
            browserify: {
                files: [
					'<%= grnt.app %>/components/operational/**/*.js',
					'<%= grnt.app %>/mocks/**/*.js',
					'<%= grnt.app %>/mocks/**/*.json',
					'!<%= grnt.app %>/components/**/*.spec.js'
                ],
                tasks: ['webpack:dev'],
                options: { livereload: true }
            },
            styles: {
                files: ['<%= grnt.app %>/assets/styles/{,*/}*.css'],
                tasks: ['autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
					'<%= grnt.app %>/{,*/}*.html',
					'<%= grnt.app %>/components/operational/**/*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= grnt.app %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        clean: {
            dist: {
                files: [
					{
					    dot: true,
					    src: [
							'.tmp',
							'<%= grnt.dist %>/*',
							'!<%= grnt.dist %>/.git*'
					    ]
					}]
            },
            afterBuild: {
                files: [
					{
					    dot: true,
					    src: ['<%= grnt.dist %>/scripts/index.js']
					}]
            },
            server: {
                files: [
					{
					    force: true,
					    src: ['.tmp']
					}]
            },
            docs: {
                files: [
					{
					    force: true,
					    src: ['docs']
					}]
            }
        },

        jshint: {
            options: {
                force: true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['<%= grnt.app %>/components/operational/**/*.js']
            }
        },
        karma: {
            unit: {
                background: true,
                singleRun: false,
                configFile: 'config/karma.conf.js'
            },
            single: {
                configFile: 'config/karma.conf.js'
            },
            auto: {
                singleRun: false,
                autoWatch: true,
                configFile: 'config/karma.conf.js'
            }
        },

        sass: {
            options: {
                soureceMap: true,
                includePaths: ['<%= grnt.app %>/bower_components']
            },
            dist: {
                options: {
                    soureceMap: false
                },
                files: {
                    '<%= grnt.dist %>/assets/app.css': '<%= grnt.app %>/assets/styles/style.scss'
                }
            },
            server: {
                files: {
                    '.tmp/assets/app.css': '<%= grnt.app %>/assets/styles/style.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                options: {
                    map: false
                },
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.dist %>/assets/',
					    src: '*.css',
					    dest: '<%= grnt.dist %>/assets/'
					}]
            },
            server: {
                options: {
                    map: true
                },
                files: [
					{
					    expand: true,
					    cwd: '.tmp/assets/',
					    src: '*.css',
					    dest: '.tmp/assets/'
					}]
            }
        },

        webpack: {
            dev: webpackDevConfig,
            prod: webpackPublicConfig
        },

        browserify: {
            app: {
                files: { '.tmp/assets/app.js': ['<%= grnt.app %>/app.js'] },
                options: {
                    alias: browserifyAliasConfig,
                    browserifyOptions: {
                        debug: true,
                        fast: true
                    },
                    transform: [
						'debowerify'
                    ]
                }
            },
            spec: {
                files: { '.tmp/tests/spec.js': ['<%= grnt.app %>/components/operational/**/*.spec.js'] },
                options: {
                    debug: true
                }
            }
        },

        csso: {
            dist: {
                files: {
                    '<%= grnt.dist %>/assets/app.css': [
						'<%= grnt.dist %>/assets/app.css'
                    ]
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [
					{
					    src: '<%= grnt.dist %>/assets/app.js',
					    dest: '<%= grnt.dist %>/assets/app.js'
					}]
            }
        },

        copy: {
            dist: {
                files: [
					{
					    expand: true,
					    dot: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.dist %>',
					    src: [
							'*.{ico,png,txt}',
							'assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}',
							'assets/languages/*.json',
							'{,*/}*.html',
							'!components/{,*/}*.html',
							'components/operational/{,*/}*.html',
							'assets/fonts/{,*/}*.*',
							'bower_components/sass-bootstrap/fonts/*.*',
							'bower_components/jquery/dist/jquery.min.js',
							'bower_components/moment/min/moment.min.js',
                            'bower_components/pikaday/pikaday.js',
							'bower_components/zeroclipboard/dist/ZeroClipboard.min.js',
                            'bower_components/handsontable/dist/handsontable.min.js',
							'bower_components/angular-i18n/*.*',
					    ]
					}]
            },
            html: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.dist %>',
					    src: ['components/operational/**/*.html']
					}]
            },
            fontsDist: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.dist %>/fonts',
					    src: ['bower_components/font-awesome/fonts/*.*'],
					    flatten: true
					}]
            },
            fontsGridDist: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.dist %>/assets',
					    src: [
                            'bower_components/angular-ui-grid/ui-grid.ttf',
                            'bower_components/angular-ui-grid/ui-grid.woff',
                            'bower_components/angular-ui-grid/ui-grid.eot',
                            'bower_components/angular-ui-grid/ui-grid.svg'
					    ],
					    flatten: true
					}]
            },
            fontsGridApp: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.app %>/assets',
					    src: [
                            'bower_components/angular-ui-grid/ui-grid.ttf',
                            'bower_components/angular-ui-grid/ui-grid.woff',
                            'bower_components/angular-ui-grid/ui-grid.eot',
                            'bower_components/angular-ui-grid/ui-grid.svg'
					    ],
					    flatten: true
					}]
            },
            fontsApp: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.app %>/fonts',
					    src: ['bower_components/font-awesome/fonts/*.*'],
					    flatten: true
					}]
            },
            tmpl2tmp: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '.tmp/templates/',
					    src: ['components/operational/**/templates/*.html']
					}]
            },
            tmpl2dist: {
                files: [
					{
					    expand: true,
					    cwd: '<%= grnt.app %>',
					    dest: '<%= grnt.dist %>',
					    src: ['components/operational/**/templates/*.html']
					}]
            }
        },
        ngdocs: {
            all: ['!app/components/**/*.spec.js', 'app/components/operational/**/*.js']
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            test: {
                tasks: [
					'watch',
					'karma:auto'
                ]
            }
        },
        jscs: {
            all: {
                src: ['app/components/operational/**/*.js']
            },
            options: {
                config: '.jscsrc',
                verbose: true
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
			//'jshint',
			//'jscs',
			'clean:server',
			'sass:server',
			'webpack:dev',
			//'browserify:spec',
			'autoprefixer:server',
			'copy:tmpl2tmp',
			'copy:fontsApp',
            'copy:fontsGridApp',
			'configureProxies:server',
			'connect:livereload'
        ]);

        if (target === 'test') {
            grunt.task.run([
				'concurrent:test'
            ]);
        } else {
            grunt.task.run([
				'watch'
            ]);
        }
    });

    grunt.registerTask('docs', [
		'clean:docs',
		'ngdocs',
		'connect:docs'
    ]);

    grunt.registerTask('test', function (target) {
        grunt.task.run([
			'jshint',
			'jscs',
			'webpack:dev',
			'browserify:spec'
        ]);

        if (target === 'watch') {
            grunt.task.run([
				'karma:auto'
            ]);
        } else {
            grunt.task.run([
				'karma:single'
            ]);
        }
    });


    grunt.registerTask('build', [
		'clean:dist',
		'sass:dist',
		'autoprefixer:dist',
		'csso',
		'clean:afterBuild',
		'copy:dist',
		'copy:html',
		'copy:tmpl2dist',
		'copy:fontsDist',
        'copy:fontsGridDist',
		'webpack:prod'
    ]);

    grunt.registerTask('default', [
		'test',
		'build'
    ]);
};
