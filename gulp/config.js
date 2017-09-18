  'use strict';

  module.exports = function() {
    var config = {
      autoprefixer: {
        browsers: ['> 1%', 'last 4 versions', 'Firefox >= 20', 'iOS >=7'],
        cascade: true
      },
      scssOrder: ['**/app.scss'],
      jsOrder: ['**/app.js', '**/appConfig.js']
    };

    config.path = {};
    config.path.dev = 'dev';
    config.path.be = 'backend';
    config.path.dest = 'public';
    config.path.pug = config.path.dev + '/**/*.pug';
    config.path.css = config.path.dev + '/**/*.scss';
    config.path.js = config.path.dev + '/**/!(*spec).js';
    config.path.assets = config.path.dev + '/files/**/*';

    return config;
  };
