export const isObject = (entity = {}) => {
  return (
    entity !== null && typeof entity === 'object' && !Array.isArray(entity)
  );
};

export const range = (amount, initial, increment = 1) => {
  const entity = [...Array(amount).keys()];

  return initial
    ? entity.map((index) => (index + initial) * increment)
    : entity;
};

export const safeGet = (entity, path, fallback) => {
  if (!entity) {
    throw new Error("Entity isn't specified or falsy");
  }
  if (path && typeof path !== 'string') {
    throw new Error('Path should be a string');
  }

  return path
    ? path.split('.').reduce((value, key, _, arr) => {
        if (!value[key]) {
          // break
          arr.splice(1);
        } else if (!fallback) {
          throw new Error("Can't get specified property");
        }

        return value[key] || fallback;
      }, entity)
    : entity;
};

export const safeSet = (entity, path, value) => {
  if (!entity) {
    throw new Error("Entity isn't specified or falsy");
  }

  if (path && typeof path !== 'string') {
    throw new Error('Path should be a string');
  }

  let target = entity;

  path.split('.').forEach((key, i, arr) => {
    if (i === arr.length - 1) {
      target[key] = value;

      return;
    }

    if (!target[key]) {
      target[key] = {};
    }

    if (!isObject(target[key])) {
      throw new Error(`${target[key]} is not an object`);
    }

    target = target[key];
  });
};
