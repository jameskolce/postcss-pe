/**
 * Convert unit to unitless px value.
 * @param  {Number} value
 * @param  {String} unit
 * @return {Number}
 */
const toPx = (value, unit, defaultFontSize) => {
  if (unit === 'em' || unit === 'rem') {
    return value * defaultFontSize;
  }
  else if (unit === '%') {
    return (value / 100) * defaultFontSize;
  }

  return value;
};

module.exports = (css, opts) => {
  // All the line heights will be stored in this array
  const fontSize = [];

  css.walkRules(opts.rootSelector, (rule) => {
    rule.walkDecls(/(font|font-size)/, (decl) => {
      // Omit @media font|font-size
      if (decl.parent.parent.type === 'atrule') return;

      // Matches {$1:font size}{$2:unit}.
      const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)/);

      // Do nothing if there is a font property but no font-size defined
      if (!fontProps) { return; }

      // Return the font-size
      fontSize.push(toPx(fontProps[1], fontProps[2], opts.fontSize));
    });
  });

  // Return the last size or underfined if array is empty
  return fontSize.pop();
};
