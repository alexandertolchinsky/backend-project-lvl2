import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as ini from 'ini';

const parse = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const fileContent = fs.readFileSync(absolutePathToFile, 'utf8');
  const fileExtension = path.extname(absolutePathToFile);
  if (fileExtension === '.yml') {
    return yaml.safeLoad(fileContent);
  }
  if (fileExtension === '.ini') {
    return ini.parse(fileContent);
  }
  return JSON.parse(fileContent);
};

export default parse;
