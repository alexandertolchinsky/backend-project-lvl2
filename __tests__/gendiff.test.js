import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

test.each([
  ['before.json', 'after.json', 'stylish'],
  ['before.yml', 'after.yml', 'stylish'],
  ['before.ini', 'after.ini', 'stylish'],
  ['before.json', 'after.json', 'plain'],
  ['before.yml', 'after.yml', 'plain'],
  ['before.ini', 'after.ini', 'plain'],
  ['before.json', 'after.json', 'json'],
  ['before.yml', 'after.yml', 'json'],
  ['before.ini', 'after.ini', 'json'],
])('compare %s and %s, result in %s format', (fileName1, fileName2, format) => {
  const correctAnswer = readFileSync(`__fixtures__/result.${format}.txt`, 'utf8');
  const absolutePathToFile1 = `${__dirname}/../__fixtures__/${fileName1}`;
  const absolutePathToFile2 = `${__dirname}/../__fixtures__/${fileName2}`;
  expect(genDiff(absolutePathToFile1, absolutePathToFile2, `${format}`)).toEqual(correctAnswer);
  expect(genDiff(`__fixtures__/${fileName1}`, `__fixtures__/${fileName2}`, `${format}`)).toEqual(correctAnswer);
});
