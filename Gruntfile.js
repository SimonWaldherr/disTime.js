module.exports = function(grunt) {
  gzip = require("gzip-js");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compare_size: {
      files: ['./disTime.js', './disTime.i18n.js', './disTime.min.js'],
      options: {
        compress: {
          gz: function( contents ) {
            return gzip.zip( contents, {} ).length;
          }
        },
        cache: "./.size.json"
      }
    },
    uglify: {
      options: {
        banner: '/* * * * * * * * * *\n' +
                ' *   disTime .js   *\n' +
                ' *  Version 0.7.5  *\n' +
                ' *  License:  MIT  *\n' +
                ' * Simon  Waldherr *\n' +
                ' * * * * * * * * * */\n\n',
        footer: '\n\n\n\n /* fnord */'
      },
      dist: {
        files: {
          './disTime.min.js': ['./disTime.js', './disTime.i18n.js']
        }
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: './disTime.min.js', dest: './', ext: '.gz.js'}
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-compare-size');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify', 'compare_size']);
};
