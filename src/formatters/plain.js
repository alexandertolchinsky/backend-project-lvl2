const formatValue = (value) => {
  const type = typeof value;
  switch (type) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const plain = (obj, path) => {
  let result = '';
  const keys = Object.keys(obj);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const { status } = obj[key];
    const newPath = (path === '') ? key : `${path}.${key}`;
    switch (status) {
      case 'add':
        result += `Property '${newPath}' was added with value: ${formatValue(obj[key].value)}\n`;
        break;
      case 'remove':
        result += `Property '${newPath}' was removed\n`;
        break;
      case 'update':
        result += `Property '${newPath}' was updated. From ${formatValue(obj[key].value.old)} to ${formatValue(obj[key].value.new)}\n`;
        break;
      case 'objects':
        result += plain(obj[key].value, newPath);
        break;
      default:
        break;
    }
  }
  return result;
};

export default plain;
