const postcss = require('postcss');
const pxToEm = require('./lib/pxToEm');

const defaults = {
  rootSelector: ':root',
  unit: 'pe',
  fontSize: null
};

module.exports = postcss.plugin('postcss-pe', (opts) => {
  opts = opts || {};
  opts = Object.assign(defaults, opts);

  return (css) => {
    const peReg = new RegExp('(\\d*\\.?\\d+)(?:\\/)?(\\d*\\.?\\d+)?' + opts.unit, 'gi');

    css.replaceValues(peReg, {fast: opts.unit}, (val) => {
      return pxToEm(css, val, opts);
    });
  };
});
