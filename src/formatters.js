const stylish = (obj, n) => {
  let result = '';
  const spaces = ' '.repeat(n);
  const keys = Object.keys(obj);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const sliceKey = key.slice(0, 2);
    if (sliceKey !== '+ ' && sliceKey !== '- ') {
      result += '  ';
    }
    if (typeof obj[key] === 'object') {
      const data = stylish(obj[key], n + 4);
      result += `${spaces}${key}: {\n${data}${spaces}  }\n`;
    } else {
      result += `${spaces}${key}: ${obj[key]}\n`;
    }
  }
  return result;
};

const reformat = (obj, format) => {
  let result = '{\n';
  if (format === 'stylish') {
    result += stylish(obj, 2);
  }
  result += '}\n';
  return result;
};

export default reformat;
