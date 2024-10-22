// TODO move to general utils
export function reduceUndefined<T extends object>(value: T): T {
  return Object.keys(value).reduce<T>((acc, key) => {
    const typedKey = key as keyof T;
    if (value[typedKey] !== undefined) {
      acc[typedKey] = value[typedKey];
    }
    return acc;
  }, {} as T);
}