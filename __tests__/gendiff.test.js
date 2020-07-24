import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../src/index.js';

const getAbsolutePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixturePath = (filename) => join('__fixtures__', filename);

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
  const correctAnswer = readFileSync(getFixturePath(`result.${format}.txt`), 'utf-8');
  expect(genDiff(getAbsolutePath(fileName1), getAbsolutePath(fileName2), format))
    .toEqual(correctAnswer);
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), format))
    .toEqual(correctAnswer);
});
