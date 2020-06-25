import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const parsedFile1 = parse(pathToFile1);
  const parsedFile2 = parse(pathToFile2);
  const uniqKeys = _.uniq([...Object.keys(parsedFile1), ...Object.keys(parsedFile2)]);
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of uniqKeys) {
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        result.push(`    ${key}: ${parsedFile1[key]}`);
      } else {
        result.push(`  + ${key}: ${parsedFile2[key]}\n  - ${key}: ${parsedFile1[key]}`);
      }
    } else if (!_.has(parsedFile1, key)) {
      result.push(`  + ${key}: ${parsedFile2[key]}`);
    } else {
      result.push(`  - ${key}: ${parsedFile1[key]}`);
    }
  }
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
