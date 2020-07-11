const formatValue = (value) => {
  // eslint-disable-next-line eqeqeq
  if (typeof value === 'string' && Number(value) == value) {
    return Number(value);
  }
  if (typeof value === 'object') {
    const result = {};
    const keys = Object.keys(value);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      result[key] = formatValue(value[key]);
    }
    return result;
  }
  return value;
};

const json = (obj, parent) => {
  let result = [];
  const keys = Object.keys(obj);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const { status } = obj[key];
    switch (status) {
      case 'add': {
        const tmp = {};
        tmp.name = key;
        tmp.parent = parent;
        tmp.status = 'add';
        tmp.value = formatValue(obj[key].value);
        result.push(tmp);
        break;
      }
      case 'remove': {
        const tmp = {};
        tmp.name = key;
        tmp.parent = parent;
        tmp.status = 'remove';
        tmp.value = formatValue(obj[key].value);
        result.push(tmp);
        break;
      }
      case 'update': {
        const tmp = {};
        tmp.name = key;
        tmp.parent = parent;
        tmp.status = 'update';
        const value = {};
        value.old = formatValue(obj[key].value.old);
        value.new = formatValue(obj[key].value.new);
        tmp.value = value;
        result.push(tmp);
        break;
      }
      case 'objects': {
        const data = JSON.parse(json(obj[key].value, key));
        result = [...result, ...data];
        break;
      }
      default:
        break;
    }
  }
  return JSON.stringify(result);
};

export default json;
