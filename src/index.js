import _ from 'lodash';
import parse from './parsers.js';
import reformat from './formatters.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const parsedFile1 = parse(pathToFile1);
  const parsedFile2 = parse(pathToFile2);

  const diff = (obj1, obj2) => {
    const result = {};
    const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          result[`${key}`] = diff(obj1[key], obj2[key]);
        } else if (obj1[key] === obj2[key]) {
          result[`${key}`] = obj1[key];
        } else {
          result[`+ ${key}`] = obj2[key];
          result[`- ${key}`] = obj1[key];
        }
      } else if (!_.has(obj1, key)) {
        result[`+ ${key}`] = obj2[key];
      } else {
        result[`- ${key}`] = obj1[key];
      }
    }
    return result;
  };
  return reformat(diff(parsedFile1, parsedFile2), format);
};

export default genDiff;
