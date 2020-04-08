import * as path from 'path';
import * as fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const absolutePathToFile1 = path.resolve(pathToFile1);
  const absolutePathToFile2 = path.resolve(pathToFile2);
  const file1Content = fs.readFileSync(absolutePathToFile1, 'utf8');
  const file2Content = fs.readFileSync(absolutePathToFile2, 'utf8');
  const parsedFile1 = JSON.parse(file1Content);
  const parsedFile2 = JSON.parse(file2Content);
  const uniqKeys = _.uniq([...Object.keys(parsedFile1), ...Object.keys(parsedFile2)]);
  const result = [];
  result.push('{');
  for (const key of uniqKeys) {
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        result.push(`    ${key}: ${parsedFile1[key]}`);
      } else {
        result.push(`  + ${key}: ${parsedFile2[key]}\n  - ${key}: ${parsedFile1[key]}`);
      }
    }
    else {
      if (!_.has(parsedFile1, key)) {
        result.push(`  + ${key}: ${parsedFile2[key]}`);
      } else {
        result.push(`  - ${key}: ${parsedFile1[key]}`);
      }
    }
  }
  result.push('}');
  console.log(result.join('\n'));
};

export default genDiff;
