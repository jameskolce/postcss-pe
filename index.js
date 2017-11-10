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
    const userFontSize = opts.rootFontSize || opts.fontSize; // opts.fontSize legacy option name
    opts = Object.assign(defaults, opts);

  return (css) => {
    let rootFontSize = userFontSize || getRootSize(css, opts) || opts.rootFontSize;
    const peReg = new RegExp('(\\d*\\.?\\d+)(?:\\/)?(\\d*\\.?\\d+)?' + opts.unit, 'gi');
	const peFsReg = new RegExp('(\\d*\\.?\\d+)(?:\\/)?(\\d*\\.?\\d+)?(' + opts.unit + ')', 'i');


    return css.walkRules(rule => {
		let ruleFontSize = rootFontSize;

		if ( opts.followRuleFontSize ) {
			rule.walkDecls('font-size', decl => {
				// Match only opts.unit (pe)
				let props = decl.value.match( peFsReg );
				// Escape if font-size is not opts.unit
				if ( !props ) return;
				// Define new divider
				ruleFontSize = props[1];
				// Transform font-size to em
				decl.value = pxToEm(decl.value, rootFontSize);
			});
		}

		rule.replaceValues(peReg, {fast: opts.unit}, (val) => {
		  return pxToEm(val, ruleFontSize);
		});
    });

  };
});
