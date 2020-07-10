const formatValue = (value, spaces) => {
  const type = typeof value;
  switch (type) {
    case 'object': {
      let result = '{\n';
      const keys = Object.keys(value);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        result += `${spaces}      ${key}: ${value[key]}\n`;
      }
      result += `${spaces}  }`;
      return result;
    }
    default:
      return value;
  }
};

const stylish = (obj, n) => {
  let result = '';
  const spaces = ' '.repeat(n);
  const keys = Object.keys(obj);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const { status } = obj[key];
    switch (status) {
      case 'objects': {
        const data = stylish(obj[key].value, n + 4);
        result += `${spaces}  ${key}: {\n${data}${spaces}  }\n`;
        break;
      }
      case 'add':
        result += `${spaces}+ ${key}: ${formatValue(obj[key].value, spaces)}\n`;
        break;
      case 'remove':
        result += `${spaces}- ${key}: ${formatValue(obj[key].value, spaces)}\n`;
        break;
      case 'update':
        result += `${spaces}+ ${key}: ${formatValue(obj[key].value.new, spaces)}\n`;
        result += `${spaces}- ${key}: ${formatValue(obj[key].value.old, spaces)}\n`;
        break;
      default:
        result += `${spaces}  ${key}: ${formatValue(obj[key].value, spaces)}\n`;
        break;
    }
  }
  return result;
};

export default stylish;
