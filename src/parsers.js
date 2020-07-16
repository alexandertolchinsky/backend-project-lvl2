import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad as parseYaml } from 'js-yaml';
import { parse as parseIni } from 'ini';

const fixIniParserBug = (value) => {
  // eslint-disable-next-line eqeqeq
  if (typeof value === 'string' && Number(value) == value) {
    return Number(value);
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const cb = (acc, key) => ({ ...acc, [key]: fixIniParserBug(value[key]) });
    return keys.reduce(cb, {});
  }
  return value;
};

const parse = (content, fileExtension) => {
  if (fileExtension === '.yml') {
    return parseYaml(content);
  }
  if (fileExtension === '.ini') {
    return fixIniParserBug(parseIni(content));
  }
  return JSON.parse(content);
};

const getParsedContent = (filepath) => {
  const fileAbsolutePath = resolve(filepath);
  const content = readFileSync(filepath, 'utf8');
  const fileExtension = extname(fileAbsolutePath);
  return parse(content, fileExtension);
};

export default getParsedContent;
