export const sortListOfObjects = (list) => {
  list.sort((a, b) => {
    if (a.tags[0][1].toLowerCase() < b.tags[0][1].toLowerCase()) return -1;
    if (a.tags[0][1].toLowerCase() > b.tags[0][1].toLowerCase()) return 1;
    return 0;
  });
  return list

}
