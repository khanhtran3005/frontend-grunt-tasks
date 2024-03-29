module.exports = function(grunt) {
    'use strict';
    /**
     * Config directory
     * @dist: distribution folder. Default: dist
     * @assets: source folder. Default: assets
     */
    var dirs = {
        src: 'src', //source
        dist: 'dist', //distribution

        srcAssets: '<%= dir.src %>/assets',
        distAssets: '<%= dir.dist %>/assets',

        cssSrc: '<%= dir.srcAssets %>/css',
        cssDist: '<%= dir.distAssets %>/css',

        jsSrc: '<%= dir.srcAssets %>/js',
        jsDist: '<%= dir.distAssets %>/js',

        imageSrc: '<%= dir.srcAssets %>/images',
        imageDist: '<%= dir.distAssets %>/images'
    };

    /*--------------------------Config----------------------------*/

    var mozjpeg = require('imagemin-mozjpeg');

    // Load NPM tasks 
    require('load-grunt-tasks')(grunt, {
        scope: ['devDependencies'],
        config: 'package.json'
    });

    // Grunt Configuration
    grunt.initConfig({
        dir: dirs,
        imagemin: {
            dist: {
                options: { // Target options
                    optimizationLevel: 7,
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.imageSrc%>',
                    src: '**/*.{gif,GIF,jpg,JPG,png,PNG}',
                    dest: '<%= dir.imageDist %>'
                }]
            },
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.cssSrc %>',
                    src: '**/*.css',
                    dest: '<%= dir.cssDist %>'
                }]
            },
            dist_concat: {
                files: {
                    '<%= dir.cssDist %>/style.concat.css': ['<%= dir.cssSrc %>/**/*.css']
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangle: {
                    except: ['jQuery', 'Backbone', 'angular', 'Ember', 'Modernizr']
                },
                report: 'gzip'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.jsSrc%>',
                    src: '**/*.js',
                    dest: '<%= dir.jsDist %>'
                }]
            },
            dist_concat: {
                files: {
                    '<%= dir.jsDist %>/init.concat.js': ['<%= dir.jsSrc %>/**/*.js']
                }
            }
        },
        htmlmin: {
            dist: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.dist%>',
                    src: '**/*.html',
                    dest: '<%= dir.dist%>',
                }]
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/assets/**/*.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    require: true,
                    '$': true
                }
            }
        },
        csslint: {
            options: {
                //any option here. Ref: https://github.com/gruntjs/grunt-contrib-csslint
            },
            strict: {
                src: ['<%= dir.cssSrc %>/**/*.css']
            }
        },
        'sails-linker': {
            js: {
                options: {
                    startTag: '<!-- SCRIPT -->',
                    endTag: '<!-- SCRIPT END -->',
                    fileTmpl: '<script src="%s" async></script>',
                    appRoot: '<%= dir.dist %>'
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    '<%= dir.dist %>/**/*.html': ['<%= dir.jsDist %>/**/*.js']
                },
            },
            css: {
                options: {
                    startTag: '<!-- STYLE -->',
                    endTag: '<!-- STYLE END -->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '<%= dir.dist %>'
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    '<%= dir.dist %>/**/*.html': ['<%= dir.cssDist %>/**/*.css']
                },
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: '<%= dir.src %>/',
                src: ['**/*.html', '**/fonts/**'], 
                dest: '<%= dir.dist %>/', 
                filter: 'isFile'
            },
        },

    });




    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);
    // Compress images
    grunt.registerTask('min', ['cssmin:dist', 'uglify:dist', 'imagemin', 'htmlmin']);

    grunt.registerTask('min:concat', ['cssmin:dist_concat', 'uglify:dist_concat', 'imagemin', 'htmlmin']);

    // grunt.registerTask('min:concat', ['uglify:dist_concat']);
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Build task(s).
    grunt.registerTask('build', ['uglify:dist_concat', 'cssmin:dist_concat', 'copy', 'sails-linker:js', 'sails-linker:css', 'htmlmin', 'imagemin']);

    grunt.registerTask('build:concat', ['uglify:dist_concat', 'cssmin:dist_concat', 'copy', 'imagemin', 'htmlmin', ]);
};
