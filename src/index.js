import { has, union } from 'lodash';
import getParsedContent from './parsers.js';
import reformat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const parsedContent1 = getParsedContent(filepath1);
  const parsedContent2 = getParsedContent(filepath2);

  const getDiff = (obj1, obj2) => {
    const keys = union(Object.keys(obj1), Object.keys(obj2));
    const result = keys.reduce((acc, key) => {
      if (has(obj1, key) && !has(obj2, key)) {
        return [...acc, { key, value: obj1[key], status: 'remove' }];
      }
      if (!has(obj1, key) && has(obj2, key)) {
        return [...acc, { key, value: obj2[key], status: 'add' }];
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const value = getDiff(obj1[key], obj2[key]);
        return [...acc, { key, value, status: 'objects' }];
      }
      if (obj1[key] !== obj2[key]) {
        return [...acc, { key, value: { old: obj1[key], new: obj2[key] }, status: 'update' }];
      }
      return [...acc, { key, value: obj1[key], status: 'unchanged' }];
    }, []);
    return result;
  };
  const diff = getDiff(parsedContent1, parsedContent2);
  return reformat(diff, format);
};

export default genDiff;
