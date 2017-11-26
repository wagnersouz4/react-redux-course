if (process.env.NODE_ENV === 'production') {
  module.exports = require('./confiureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}