const BROWSER_DEFAULT = 16;

/**
 * Convert unit to unitless px value.
 * @param  {Number} value
 * @param  {String} unit
 * @return {Number}
 */
const toPx = (value, unit) => {
  if (unit === 'em' || unit === 'rem') {
    return value * BROWSER_DEFAULT;
  }
  else if (unit === '%') {
    return (value / 100) * BROWSER_DEFAULT;
  }

  return value;
};

module.exports = (css, opts) => {
  // All the line heights will be stored in this array
  const fontSize = [];

  css.walkRules(opts.rootSelector, (rule) => {
    rule.walkDecls('/(font|font-size)/', (decl) => {
      // Matches {$1:font size}{$2:unit}.
      const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)/);

      // Do nothing if there is a font property but no font-size defined
      if (!fontProps) { return; }

      // Return the font-size
      fontSize.push(toPx(fontProps[1], fontProps[2]));
    });
  });

  // Return the last size or the browser default if there is none
  return fontSize.pop() || BROWSER_DEFAULT;
};