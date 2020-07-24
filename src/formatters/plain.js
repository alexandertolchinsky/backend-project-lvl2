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
    const cb = (acc, item) => {
      const { status } = item;
      const newPath = (path === '') ? item.key : `${path}.${item.key}`;
      switch (status) {
        case 'added':
          return [...acc, `Property '${newPath}' was added with value: ${formatValue(item.value)}`];
        case 'removed':
          return [...acc, `Property '${newPath}' was removed`];
        case 'updated':
          return [...acc, `Property '${newPath}' was updated. From ${formatValue(item.value.old)} to ${formatValue(item.value.new)}`];
        case 'objects':
          return [...acc, `${buildPlainStr(item.value, newPath)}`];
        case 'unchanged':
          return acc;
        default:
          return new Error(`Unknown status: '${status}'!`);
      }
    };
    return items.reduce(cb, []).join('\n');
  };
  return buildPlainStr(diff, '');
};
export default getPlainStr;
