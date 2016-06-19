const test = require("tape");
const postcss = require('postcss');
const fs = require('fs');

const actual = (file) => {
  const css = fs.readFileSync(`test/fixtures/${file}.css`, 'utf8');

  return postcss([
    require('../')
  ]).process(css).css.replace(/\s+/g, '');
};

const expected = (file) => {
  return fs.readFileSync(`test/fixtures/${file}.expected.css`, 'utf8').replace(/\s+/g, '');
};

test('units', (t) => {
  t.equal(
    actual('test1'),
    expected('test1'),
    'should be transformed with a parent font size value');

  t.equal(
    actual('test2'),
    expected('test2'),
    'should be transformed without a parent font size value');

  t.equal(
      actual('test3'),
      expected('test3'),
      'should be transformed with mixed values');

  t.end();
});
