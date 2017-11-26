import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */
fs.readFile('src/index.html', 'utf-8', (err, markup) => {
  if (err) {
    return console.log(err.bold.red);
  }
  const $ = cheerio.load(markup); // creates an in-memory doom for you to play ;)

  // adding the sytles.css in the index.html
  $('head').prepend('<link rel="stylesheet" href="styles.css" />');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      console.log(err.bold.red);
    }
    console.log('index.html written to /dist'.green);
  });
});