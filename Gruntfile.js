module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            test: ['test/**/*', '!test/mocha.opts']
        },
        concurrent: {
            app: {
                target: ['nodemon', 'watch']
            },
            test: {
                target: ['watch:buildTest', 'watch:runTest'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        concat: {
            test: {
                src: ['testApp.js', '**/test/*.js', '!test/**', '!node_modules/**', '!**/*stub.js'],
                dest: 'test/test.js'
            },
            options: {
                separator: '\n',
                sourceMap: true
            }
        },
        copy: {
            test: {
                expand: 'true',
                flatten: true,
                src: ['**/test/resources/**', '!test/**', '!node_modules/**'],
                dest: 'test/resources/',
                filter: 'isFile'
            }
        },
        watch: {
            files: ['!webapp/bower_components/**'],
            styles: {
                files: 'webapp/**/*.css',
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: 'webapp/**/*.js',
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            pages: {
                files: 'webapp/**/*.html',
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            },
            runTest: {
                files: ['**/test/*.js', '!test/**'],
                tasks: ['mocha-hack']
            },
            buildTest: {
                files: ['**/*.js', '!webapp/**', '!node_modules/**', '!test/**'],
                tasks: ['clean:test', 'concat:test']
            },
            ts: {
                files: ['**/*.ts', '!node_modules/**', '!typings/**'],
                tasks: ['ts']
            }

        },
        nodemon: {//https://github.com/ChrisWren/grunt-nodemon
            dev: {
                script: 'AppServer.js',
                cwd: './',
                ignore: ['node_modules/**', 'webapp/**'],
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.color);
                    });

                    nodemon.on('config:update', function () {
                        setTimout(function () {
                            require('open')('http://localhost:3000');
                        }, 500);
                    });

                    nodemon.on('restart', function () {
                        setTimeout(function () {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 500);
                    });
                }
            }
        },
        'mocha-hack': {
            options: {
                globals: ['expect', 'projectPath'],
                timeout: 1500,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            //all: {src: ['**/test/*.js', '!node_modules/**', '!webapp/**', '!test/**']}
            all: {src: ['test/test.js']}
        },
        ts: {
            default: {
                src: ["references.ts", "**/*.ts", "!node_modules/**", "!webapp/bower_components/**",
                    "!typings/**", "typings/tsd.d.ts"],
                reference: "references.ts",
                options: {
                    compile: false
                }
            },
            options: {
                module: 'commonjs'
            }
        }
    });

    //grunt.registerTask('mongo', function(){
    //    grunt.util.spawn({
    //        cmd: 'start-process mongod'
    //    }, function(error, result, code){
    //        var done = this.sync();
    //        if(error){
    //            grunt.fail.fatal(error, code);
    //        } else {
    //            grunt.log.writeln("mongodb started");
    //        }
    //    })
    //});

    grunt.registerTask('set-test-globals', function () {
        global['projectPath'] = function (path) {
            return __dirname + path;
        };

    });


    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-hack');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default-test', ['concat:test', 'set-test-globals']);

    grunt.registerTask('default', ['set-test-globals', 'concurrent:target']);
    //grunt.registerTask('test', ['set-test-globals', 'mocha-hack']); old way with running mocha through grunt
    //new way uses mocha.opts file, grunt just watches and copies changed test files to the default mocha /test directory
    //and then run grunt tests through webstorm
    grunt.registerTask('test', ['clean:test', 'concat:test', 'set-test-globals', 'mocha-hack', 'concurrent:test']);
    grunt.registerTask('debug', ['set-test-globals', 'nodemon']);
};