import genDiff from '../src/index.js';

test('compare JSON files', () => {
  const correctAnswer = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/before.json`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/after.json`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2)).toEqual(correctAnswer);
  expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(correctAnswer);
});

test('compare YAML files', () => {
  const correctAnswer = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/before.yml`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/after.yml`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2)).toEqual(correctAnswer);
  expect(genDiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toEqual(correctAnswer);
});

test('compare INI files', () => {
  const correctAnswer = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/before.ini`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/after.ini`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2)).toEqual(correctAnswer);
  expect(genDiff('__fixtures__/before.ini', '__fixtures__/after.ini')).toEqual(correctAnswer);
});
