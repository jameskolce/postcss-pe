const postcss = require('postcss');
const getRootSize = require('./lib/getRootSize');
const pxToEm = require('./lib/pxToEm');

const defaults = {
  rootSelector: ':root',
  unit: 'pe',
  rootFontSize: 16,
  followRuleFontSize: false
};

module.exports = postcss.plugin('postcss-pe', (opts) => {
    opts = opts || {};
    const userFontSize = opts.rootFontSize;
    opts = Object.assign(defaults, opts);

  return (css) => {
    let rootFontSize = userFontSize || getRootSize(css, opts) || opts.rootFontSize;
    const peReg = new RegExp('(\\d*\\.?\\d+)(?:\\/)?(\\d*\\.?\\d+)?' + opts.unit, 'gi');


    return css.walkRules(rule => {
		let ruleFontSize = rootFontSize;

		if ( opts.followRuleFontSize ) {
			rule.walkDecls('font-size', decl => {
				let props = decl.value.match(/(\d*\.?\d+)(?:\/)?(\d*\.?\d+)?(\w+)/);
				// Escape if font-size: inherit, etc.
				if ( !props ) return;
				ruleFontSize = props[1];
				// Transform rule font-size to em, omit px units.
				if ( props[3] === opts.unit ) decl.value = pxToEm(decl.value, rootFontSize);
			});
		}

		rule.replaceValues(peReg, {fast: opts.unit}, (val) => {
		  return pxToEm(val, ruleFontSize);
		});
    });

  };
});
