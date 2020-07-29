const formatValue = (value, spaces) => {
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const cb = (key) => (`${spaces}      ${key}: ${value[key]}`);
    return `{\n${keys.map(cb).join('\n')}\n${spaces}  }`;
  }
  return value;
};

const getStylishStr = (diff) => {
  const buildStylishStr = (items, n) => {
    const spacesCount = 2 + (n * 4);
    const spaces = ' '.repeat(spacesCount);
    const cb = (item) => {
      const { status } = item;
      switch (status) {
        case 'updated':
          return `${spaces}+ ${item.key}: ${formatValue(item.value.new, spaces)}\n${spaces}- ${item.key}: ${formatValue(item.value.old, spaces)}`;
        case 'nested':
          return `${spaces}  ${item.key}: {\n${buildStylishStr(item.value, n + 1)}\n${spaces}  }`;
        case 'added':
          return `${spaces}+ ${item.key}: ${formatValue(item.value, spaces)}`;
        case 'removed':
          return `${spaces}- ${item.key}: ${formatValue(item.value, spaces)}`;
        case 'unchanged':
          return `${spaces}  ${item.key}: ${formatValue(item.value, spaces)}`;
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    };
    return items.map(cb).join('\n');
  };
  return `{\n${buildStylishStr(diff, 0)}\n}`;
};

export default getStylishStr;
