export const capitalize = (str: string) =>
  str ? str.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase())) : '';
