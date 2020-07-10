import stylish from './stylish.js';
import plain from './plain.js';

const reformat = (obj, format) => {
  let result;
  if (format === 'stylish') {
    const data = stylish(obj, 2);
    result = `{\n${data}}\n`;
  } else if (format === 'plain') {
    result = plain(obj, '');
  }
  return result;
};

export default reformat;
