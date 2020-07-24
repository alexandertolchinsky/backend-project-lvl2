import getStylishStr from './stylish.js';
import getPlainStr from './plain.js';

const format = (diff, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return getStylishStr(diff);
    case 'plain':
      return getPlainStr(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      return new Error(`Unknown formatter name: '${formatterName}'!`);
  }
};

export default format;
