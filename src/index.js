import { has, union } from 'lodash';
import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (filepath) => readFileSync(resolve(filepath), 'utf8');
const getFileExtension = (filepath) => extname(filepath);
const getParsedContent = (filepath) => {
  const content = readFile(filepath);
  const contentFormat = getFileExtension(filepath).slice(1);
  return parse(content, contentFormat);
};

const genDiff = (filepath1, filepath2, formatterName) => {
  const parsedContent1 = getParsedContent(filepath1);
  const parsedContent2 = getParsedContent(filepath2);
  const getDiff = (obj1, obj2) => {
    const keys = union(Object.keys(obj1), Object.keys(obj2));
    const result = keys.map((key) => {
      if (!has(obj2, key)) {
        return { key, value: obj1[key], status: 'removed' };
      }
      if (!has(obj1, key)) {
        return { key, value: obj2[key], status: 'added' };
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const value = getDiff(obj1[key], obj2[key]);
        return { key, value, status: 'nested' };
      }
      if (obj1[key] !== obj2[key]) {
        return { key, value: { old: obj1[key], new: obj2[key] }, status: 'updated' };
      }
      return { key, value: obj1[key], status: 'unchanged' };
    });
    return result;
  };
  const diff = getDiff(parsedContent1, parsedContent2);
  return format(diff, formatterName);
};

export default genDiff;
