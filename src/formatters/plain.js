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

const getPlainStr = (diff) => {
  const mapDiff = (items, path) => {
    const cb = (acc, item) => {
      const { status } = item;
      const newPath = (path === '') ? item.key : `${path}.${item.key}`;
      switch (status) {
        case 'add':
          return `${acc}Property '${newPath}' was added with value: ${formatValue(item.value)}\n`;
        case 'remove':
          return `${acc}Property '${newPath}' was removed\n`;
        case 'update':
          return `${acc}Property '${newPath}' was updated. From ${formatValue(item.value.old)} to ${formatValue(item.value.new)}\n`;
        case 'objects':
          return `${acc}${mapDiff(item.value, newPath)}`;
        default:
          return acc;
      }
    };
    return items.reduce(cb, '');
  };
  return mapDiff(diff, '');
};
export default getPlainStr;
