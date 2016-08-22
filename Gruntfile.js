module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // watch all the important stuff
    watch: {
      sass: {
        files: ['app/sass/**/*.sass'],
        tasks: ['sass:dev'],
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      }
    },

    // build sass
    sass: {
      dev: {
        options:{
          style: 'expanded'
        },
        files: {
          'app/css/main.css': 'app/sass/main.sass'
        }
      },
      build: {
        options:{
          loadPath: 'bower_components/',
          style: 'compressed',
          debugInfo: false,
          sourcemap: 'none'
        },
        files: {
          'dist/css/main.css': 'app/sass/main.sass'
        }
      }
    },

    // browsersync
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'app/css/*.css',
            'app/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './app'
        }
      }
    },

    // clean all the stuff before the new stuff comes in
    clean: {
      build: {
        src: [
          'dist/',
          '!dist./gitignore'
        ]
      }
    },

    // minify and copy html
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      build: {
        files: {
          'dist/index.html': 'app/index.html'
        }
      }
    },


    copy: {
      main: {
        files: [

          // includes files within path and its sub-directories
          {expand: true, flatten: true, src: ['app/img/**'], dest: 'dist/img/', filter: 'isFile'},

        ],
      },
    },


    // minify and copy js
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      build: {
        files: {
          'dist/js/main.js': ['app/js/main.js']
        }
      }
    }

  });

  // load tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Default task(s).
  grunt.registerTask('dev', ['browserSync', 'watch']);
  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('build', [
    'clean:build',
    'sass:build',
    'htmlmin:build',
    'uglify:build',
    'copy:main'
  ]);

};
