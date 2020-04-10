import genDiff from '../src/index.js';

test('genDiff', () => {
  const correctAnswer = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/before.json`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/after.json`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2)).toEqual(correctAnswer);
  expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(correctAnswer);
});
