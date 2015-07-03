module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngAnnotate: {
      app: {
          files: {
                  'public/dist/annotated.js': [
                    'public/controller/vizuCtrl.js',
                    'public/services/requests.js',
                    'public/app.js'
                    ]
                  },
          }
    },

    jshint: {
      files: [
        // Add filespec list here
        'public/controller/vizuCtrl.js',
        'public/services/requests.js',
        'public/app.js'
      ],
      options: {
        force: 'true',
        ignores: []
      }
    },

    shell: {
      multiple: {
        command: [
          'node server.js'
        ].join('&&')
      }
    },

    clean: {
          js: ["public/dist/*.js","!public/dist/*.min.js"]
        },
    concat: {
      basic: {
        src: [
              "public/bower_components/jquery/dist/jquery.min.js",
              "public/bower_components/bootstrap/dist/js/bootstrap.min.js",
              "public/bower_components/angular/angular.min.js",
              "public/bower_components/angular-ui-router/release/angular-ui-router.js",
              "public/bower_components/angular-animate/angular-animate.js",
              "public/bower_components/TweenMax.min.js",
              "public/bower_components/ngFx/dist/ngFx.min.js",
              "public/bower_components/d3/d3.min.js",
              ],
        dest: 'public/dist/lib.js' 
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/main.min.js': ['public/dist/annotated.js'],
          'public/dist/lib.min.js': ['public/dist/lib.js']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/bower_components/bootstrap/dist/css/bootstrap.css','public/styles/styles.css']
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('dbInit', ['shell:dbSetup']);
  grunt.registerTask('build', [
    'jshint',
    'ngAnnotate',
    'concat',
    'uglify',
    'cssmin',
    'clean'
  ]);

};