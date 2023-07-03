export const getAsString = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value ?? '';
};

export const formatBytes = (bytes: number, decimals: number) => {
  if (bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const normalizeRotationDegrees = (rotation: number): number => {
  const min = 0;
  const max = 360;
  rotation += rotation < min ? +max : rotation > max ? -max : 0;
  if (rotation < min || rotation > max) return normalizeRotationDegrees(rotation);
  return rotation;
};

export const assignDeep = (current: object, path: string[], value: any) => {
  if (path.length === 1) {
    return { ...current, [path[0]]: value };
  }
  return {
    ...current,
    [path[0]]: assignDeep(current?.[path[0]], path.slice(1), value),
  };
};