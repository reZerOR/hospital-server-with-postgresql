export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  allowedKeys: K[]
): Partial<T> =>
  allowedKeys.reduce((finalObj, key) => {
    if (key in obj) {
      finalObj[key] = obj[key];
    }
    return finalObj;
  }, {} as Partial<T>);
