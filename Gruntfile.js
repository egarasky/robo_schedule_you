module.exports = function(grunt){
    grunt.initConfig({
        concurrent: {
            target: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        'shell': {
            mongo: {
                command: 'mongod',
                options: {
                    async: true,
                }
            }
        },
        watch: {
            files: ['!Client_Webpages/bower_components/**'],
            styles: {
                files: 'Client_Webpages/**/*.css',
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scripts: {
                files: 'Client_Webpages/**/*.js',
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            pages: {
                files: 'Client_Webpages/**/*.html',
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
            }
        },
        nodemon: {//https://github.com/ChrisWren/grunt-nodemon
            dev: {
                script: 'Server_Database/Servers/AppServer.js',
                cwd: 'Server_Database/**',
                ignore: ['node_modules/**', 'Server_Database/node_modules/**'],
                callback: function(nodemon){
                    nodemon.on('log', function(event){
                        console.log(event.color);
                    });

                    nodemon.on('config:update', function() {
                        setTimout(function () {
                            require('open')('http://localhost:3000');
                        }, 500);
                    });

                    nodemon.on('restart', function(){
                        setTimeout(function(){
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 500);
                    });
                }
            }
        }
    });

    grunt.registerTask('mongo', function(){
        grunt.util.spawn({
            cmd: 'start-process mongod'
        }, function(error, result, code){
            var done = this.sync();
            if(error){
                grunt.fail.fatal(error, code);
            } else {
                grunt.log.writeln("mongodb started");
            }
        })
    });

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.registerTask('default', ['concurrent:target']);
};