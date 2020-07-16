const formatValue = (value, spaces) => {
  const type = typeof value;
  switch (type) {
    case 'object': {
      const keys = Object.keys(value);
      const cb = (acc, key) => (`${acc}${spaces}      ${key}: ${value[key]}\n`);
      return `{\n${keys.reduce(cb, '')}${spaces}  }`;
    }
    default:
      return value;
  }
};

const getStylishStr = (diff) => {
  const mapDiff = (items, n) => {
    const spaces = ' '.repeat(n);
    const cb = (acc, item) => {
      const { status } = item;
      switch (status) {
        case 'update':
          return `${acc}${spaces}+ ${item.key}: ${formatValue(item.value.new, spaces)}\n${spaces}- ${item.key}: ${formatValue(item.value.old, spaces)}\n`;
        case 'objects':
          return `${acc}${spaces}  ${item.key}: {\n${mapDiff(item.value, n + 4)}${spaces}  }\n`;
        case 'add':
          return `${acc}${spaces}+ ${item.key}: ${formatValue(item.value, spaces)}\n`;
        case 'remove':
          return `${acc}${spaces}- ${item.key}: ${formatValue(item.value, spaces)}\n`;
        default:
          return `${acc}${spaces}  ${item.key}: ${formatValue(item.value, spaces)}\n`;
      }
    };
    return items.reduce(cb, '');
  };
  return `{\n${mapDiff(diff, 2)}}\n`;
};

export default getStylishStr;
