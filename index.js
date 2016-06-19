const postcss = require('postcss');
const pxToEm = require('./lib/pxToEm');

const defaults = {
  rootSelector: ':root',
  unit: 'pe'
};

module.exports = postcss.plugin('postcss-pe', (opts = defaults) => {
  return (css) => {
    const peReg = new RegExp('(\\d*\\.?\\d+)(?:\\()?(\\d*\\.?\\d+)?(?:\\))?' + opts.unit, 'gi');

    css.replaceValues(peReg, {fast: opts.unit}, (val) => {
      return pxToEm(css, val, opts);
    });
  };
});
