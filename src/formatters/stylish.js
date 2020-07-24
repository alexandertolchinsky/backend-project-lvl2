const formatValue = (value, spaces) => {
  const type = typeof value;
  switch (type) {
    case 'object': {
      const keys = Object.keys(value);
      const cb = (key) => (`${spaces}      ${key}: ${value[key]}`);
      return `{\n${keys.map(cb).join('\n')}\n${spaces}  }`;
    }
    default:
      return value;
  }
};

const getStylishStr = (diff) => {
  const buildStylishStr = (items, n) => {
    const spaces = ' '.repeat(n);
    const cb = (item) => {
      const { status } = item;
      switch (status) {
        case 'updated':
          return `${spaces}+ ${item.key}: ${formatValue(item.value.new, spaces)}\n${spaces}- ${item.key}: ${formatValue(item.value.old, spaces)}`;
        case 'objects':
          return `${spaces}  ${item.key}: {\n${buildStylishStr(item.value, n + 4)}\n${spaces}  }`;
        case 'added':
          return `${spaces}+ ${item.key}: ${formatValue(item.value, spaces)}`;
        case 'removed':
          return `${spaces}- ${item.key}: ${formatValue(item.value, spaces)}`;
        case 'unchanged':
          return `${spaces}  ${item.key}: ${formatValue(item.value, spaces)}`;
        default:
          return new Error(`Unknown status: '${status}'!`);
      }
    };
    return items.map(cb).join('\n');
  };
  return `{\n${buildStylishStr(diff, 2)}\n}`;
};

export default getStylishStr;
