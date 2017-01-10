const postcss = require('postcss');
const getRootSize = require('./lib/getRootSize');
const pxToEm = require('./lib/pxToEm');

const defaults = {
  rootSelector: ':root',
  unit: 'pe',
  fontSize: 16
};

module.exports = postcss.plugin('postcss-pe', (opts) => {
    opts = opts || {};
    const userFontSize = opts.fontSize;
    opts = Object.assign(defaults, opts);

  return (css) => {
    const rootFontSize = userFontSize || getRootSize(css, opts) || opts.fontSize;
    const peReg = new RegExp('(\\d*\\.?\\d+)(?:\\/)?(\\d*\\.?\\d+)?' + opts.unit, 'gi');

    css.replaceValues(peReg, {fast: opts.unit}, (val) => {
      return pxToEm(val, rootFontSize);
    });
  };
});
