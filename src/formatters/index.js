import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const reformat = (obj, format) => {
  let result;
  if (format === 'stylish') {
    const data = stylish(obj, 2);
    result = `{\n${data}}\n`;
  } else if (format === 'plain') {
    result = plain(obj, '');
  } else if (format === 'json') {
    const data = json(obj, 'none');
    result = `${data}\n`;
  }
  return result;
};

export default reformat;
