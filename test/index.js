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

  //t.equal(
  //  actual('test4'),
  //  expected('test4'),
  //  'should be transformed with a rule font size value');

  t.end();
});


// timingTest
//const timeArr = [];
//let averageTime = 0;
//
//const timingTest = (file) => {
//    const start = +new Date();
//    actual(file);
//    const end = +new Date();
//    const time = (end - start) / 1000;
//    console.log(`Time: ${time} seconds`);
//    return time;
//}
//
//console.log(`# Timing test\n# Run project.css, 5 repeats`);
//
//for (let i = 0, repeats = 5; i < repeats; i++) {
//    timeArr.push(timingTest('project'));
//}
//
//timeArr.forEach(function (item) {
//    averageTime += item;
//});
//
//averageTime = (averageTime / timeArr.length).toFixed(3);
//
//console.log(`Average time: ${averageTime} seconds`);
