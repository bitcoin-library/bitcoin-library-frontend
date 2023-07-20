export function getListNameFromTags(tags) {
  function getName() {
    return tags.find((l) => l[0] === 'name');
  }
  function getIdentifier() {
    return tags.find((l) => l[0] === 'd');
  }
  const name = getName();
  const identifier = getIdentifier();

  if (Array.isArray(name)) {
    return name[1];
  } else {
    return identifier[1];
  }
}

