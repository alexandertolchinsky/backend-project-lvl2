import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const parse = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const fileContent = fs.readFileSync(absolutePathToFile, 'utf8');
  const fileExtension = path.extname(pathToFile);
  if (fileExtension === 'json') {
    return JSON.parse(fileContent);
  }
  return yaml.safeLoad(fileContent);
};

export default parse;
