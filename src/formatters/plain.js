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
  const buildPlainStr = (items, path) => {
    const cb = (item) => {
      const { status } = item;
      const newPath = (path === '') ? item.key : `${path}.${item.key}`;
      switch (status) {
        case 'added':
          return `Property '${newPath}' was added with value: ${formatValue(item.value)}`;
        case 'removed':
          return `Property '${newPath}' was removed`;
        case 'updated':
          return `Property '${newPath}' was updated. From ${formatValue(item.value.old)} to ${formatValue(item.value.new)}`;
        case 'nested':
          return `${buildPlainStr(item.value, newPath)}`;
        case 'unchanged':
          return 'unchanged';
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    };
    return items.map(cb).filter((value) => value !== 'unchanged').join('\n');
  };
  return buildPlainStr(diff, '');
};
export default getPlainStr;
