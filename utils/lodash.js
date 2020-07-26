export const _isEmpty = (obj) => {
  if (!obj) return true;
  if (Array.isArray(obj) && !obj.length) return true;
  if (typeof obj === 'object' && !Object.keys(obj).length) return true;
  return false;
};

export const _noop = () => false;
