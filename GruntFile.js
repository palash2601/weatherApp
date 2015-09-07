module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'public/js/*.js']
    },
    // configure uglify to minify js files -------------------------------------
    uglify: {
      build: {
       /* files: {
          'public/js/controller.min.js': 'public/js/controllers.js'
        }*/
        files: [
          {src: 'public/js/controllers.js', dest: 'public/js/controllers.min.js'},
          {src: 'public/js/app.js', dest: 'public/js/app.min.js'},
          {src: 'public/js/factory.js', dest: 'public/js/factory.min.js'}
        ]
      }
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};