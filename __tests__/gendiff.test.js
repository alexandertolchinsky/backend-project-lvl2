import fs from 'fs';
import genDiff from '../src/index.js';

test.each([
  ['before.json', 'after.json', 'stylish'],
  ['before.yml', 'after.yml', 'stylish'],
  ['before.ini', 'after.ini', 'stylish'],
  ['before.json', 'after.json', 'plain'],
  ['before.yml', 'after.yml', 'plain'],
  ['before.ini', 'after.ini', 'plain'],
])('compare %s and %s, result in %s format', (file1, file2, format) => {
  const correctAnswer = fs.readFileSync(`__fixtures__/result.${format}.txt`, 'utf8');
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/${file1}`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/${file2}`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2, `${format}`)).toEqual(correctAnswer);
  expect(genDiff(`__fixtures__/${file1}`, `__fixtures__/${file2}`, `${format}`)).toEqual(correctAnswer);
});
