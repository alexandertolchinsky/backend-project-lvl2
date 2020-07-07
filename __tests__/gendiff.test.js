import fs from 'fs';
import genDiff from '../src/index.js';

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('compare %s and %s', (file1, file2) => {
  const correctAnswer = fs.readFileSync('__fixtures__/result.txt', 'utf8');
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/${file1}`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/${file2}`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2, 'stylish')).toEqual(correctAnswer);
  expect(genDiff(`__fixtures__/${file1}`, `__fixtures__/${file2}`, 'stylish')).toEqual(correctAnswer);
});
