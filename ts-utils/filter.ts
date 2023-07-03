//#region Filter objects by string
export const filterObjectsByString = <T extends object>(arr: T[], searchText: string) => {
  if (!searchText.length) return arr;

  searchText = searchText.toLowerCase();

  return arr.filter((itemObj) => searchInObj(itemObj, searchText));
};

const searchInObj = <T>(itemObj: T, searchText: string) => {
  if (!itemObj) return false;

  const values = Object.values(itemObj);

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (typeof value === 'string' && searchInString(value, searchText)) {
      return true;
    }
    if (Array.isArray(value) && searchInArray(value, searchText)) {
      return true;
    }
    if (value !== null && typeof value === 'object' && searchInObj(value, searchText)) {
      return true;
    }
  }

  return false;
};

const searchInArray = (arr: any[], searchText: string) => {
  return arr.some((value) => {
    if (typeof value === 'string' && searchInString(value, searchText)) {
      return true;
    }
    if (value !== null && typeof value === 'object' && searchInObj(value, searchText)) {
      return true;
    }
    return false;
  });
};

const searchInString = (value: string, searchText: string) => {
  return value.toLowerCase().includes(searchText);
};
//#endregion