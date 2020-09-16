export const getData = async (path: string) => {
  const data = await fetch(path);

  return data.json();
};
