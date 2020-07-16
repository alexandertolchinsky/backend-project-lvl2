import getStylishStr from './stylish.js';
import getPlainStr from './plain.js';
import getJsonStr from './json.js';

const reformat = (diff, format) => {
  if (format === 'stylish') {
    return getStylishStr(diff);
  }
  if (format === 'plain') {
    return getPlainStr(diff);
  }
  if (format === 'json') {
    return getJsonStr(diff);
  }
  return null;
};

export default reformat;
