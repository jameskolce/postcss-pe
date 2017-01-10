module.exports = (val, rootFontSize) => {
  // Matches {$1:value}{$2:parentFontSize}
  const props = val.match(/(\d*\.?\d+)(?:\/)?(\d*\.?\d+)?/);

  // If there is a parent font size defined in the value
  if (props[2]) {
    return props[1] / props[2] + 'em';
  }

  // Otherwise
  return props[1] / rootFontSize + 'em';
}
