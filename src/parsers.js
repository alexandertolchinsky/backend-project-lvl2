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

const parse = (content, contentFormat) => {
  switch (contentFormat) {
    case 'yml':
      return parseYaml(content);
    case 'ini':
      return fixIniParserBug(parseIni(content));
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error(`Unknown content format: '${contentFormat}'!`);
  }
};

export default parse;
