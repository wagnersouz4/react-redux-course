/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../wepack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; //this assures the Babel dev config (for hot reloading) doesn't apply.

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, it was a great success.
  console.log('Your app has been compiled in production mode and wirtten to /dist. It\'s ready to rock and roll!!'.green);

  return 0;
});