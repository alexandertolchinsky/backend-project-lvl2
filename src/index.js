import _ from 'lodash';
import parse from './parsers.js';
import reformat from './formatters/index.js';

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
          const data = diff(obj1[key], obj2[key]);
          result[key] = {
            value: data,
            status: 'objects',
          };
        } else if (obj1[key] === obj2[key]) {
          result[key] = {
            value: obj1[key],
            status: '',
          };
        } else {
          result[key] = {
            value: {
              old: obj1[key],
              new: obj2[key],
            },
            status: 'update',
          };
        }
      } else if (!_.has(obj1, key)) {
        result[key] = {
          value: obj2[key],
          status: 'add',
        };
      } else {
        result[key] = {
          value: obj1[key],
          status: 'remove',
        };
      }
    }
    return result;
  };
  return reformat(diff(parsedFile1, parsedFile2), format);
};

export default genDiff;
