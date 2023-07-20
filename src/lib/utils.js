export const sortListOfObjects = (list) => {
  list.sort((a, b) => {
    if (a.tags[0][1].toLowerCase() < b.tags[0][1].toLowerCase()) return -1;
    if (a.tags[0][1].toLowerCase() > b.tags[0][1].toLowerCase()) return 1;
    return 0;
  });
  return list
}

export function getSelecetedBotsFromMetadata(resData, bots) {
  const bitcoinLibrary = bots.find(
    (b) => b.id === 'https://w3id.org/bitcoin-library/bots/b87cdc01-4cd8-4eb4-8ce5-ff7279144242'
  );
  const selectedFields = [...resData.keywords, ...resData.resourceType]
    .filter((e) => e.checked)
    .map((e) => e.uri);
  const selectedBots = bots.filter((b) => selectedFields.includes(b.id));
  selectedBots.push(bitcoinLibrary);
  return selectedBots;
}

export function generateShortId(length = 8) {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
