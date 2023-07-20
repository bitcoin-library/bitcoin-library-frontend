export const getListId = (list) => (list.tags.find((t) => t[0] === 'd')[1])
export const getListName = (list) => list.tags.find(t => t[0] === "name")[1]
export const getListEvents = (list) => list.tags.filter(t => t[0] === "e")

export const getSelectedListFromID = (lists, listID) => {
  console.log(lists)
  return lists.find(l => l.tags.find(t => t[0] === "d" && t[1] === listID))
}

