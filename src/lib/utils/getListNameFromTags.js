export function getListNameFromTags(tags) {
  function getName() {
    return tags.find((l) => l[0] === 'd');
  }
  const name = getName();

  return name
}

