//工具函数 判断是否是外链
export const isExternal = (path: string): boolean => {
  return /https?/.test(path);
};
