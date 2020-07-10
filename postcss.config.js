const postCSS = require('postcss-preset-env');
const CSSNano = require('cssnano');

module.exports = {
  plugins: [postCSS(), CSSNano()],
};
