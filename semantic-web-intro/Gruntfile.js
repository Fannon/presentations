/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' +
                ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * http://lab.hakim.se/reveal-js\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
                ' */'
        },

        sass: {
            main: {
                files: {
                    '../_themes/fannon/fannon.css': '../_themes/fannon/source/fannon.scss'

                }
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                jquery: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false
                }
            },
            files: ['js/presentation.js']
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: '.',
                    livereload: true
                }
            }
        },

        zip: {
            'download.zip': [
                'index.html',
                'css/**',
                'js/**',
                'lib/**',
                'images/**',
                'plugin/**'
            ]
        },

        clean: {
            temp: {
                src: ['.sass-cache']
            }
        },

        copy: {
            reveal: {
                files: [{
                    expand: true,
                    cwd: '../_reveal',
                    src: [
                        'css/reveal.min.css',
                        'css/print/*.css',
                        'js/reveal.min.js',
                        'lib/js/**',
                        'plugin/**'
                    ],
                    dest: ''
                }]
            },

            themes: {
                files: [{
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    src: ['../_themes/**/*.css'],
                    dest: 'css/theme/'
                }]
            },
            plugins: {
                files: [{
                    expand: true,
                    cwd: '../_plugins',
                    src: ['**'],
                    dest: 'plugin/'
                }]
            }
        },

        watch: {
            main: {
                files: ['Gruntfile.js', 'js/reveal.js', 'css/reveal.css'],
                tasks: 'default'
            },
            theme: {
                files: ['../_themes/fannon/source/fannon.scss'],
                tasks: 'themes'
            },
            livereload: {
                files: ['css/theme/*.css', 'index.html'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-zip');

    // Serve presentation locally
    grunt.registerTask('default', ['sass', 'copy:themes', 'connect', 'watch']);

    // Default task
    grunt.registerTask('build', ['copy:themes', 'jshint', 'themes', 'clean']);

    // Theme task
    grunt.registerTask('themes', ['sass', 'copy:themes']);

    // Package presentation to archive
    grunt.registerTask('package', ['build', 'zip']);

    // Run tests
    grunt.registerTask('test', ['jshint']);

};
