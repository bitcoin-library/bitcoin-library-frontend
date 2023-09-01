import { nip19 } from 'nostr-tools';

export function unixTimeNow() {
  return Math.floor(new Date().getTime() / 1000);
}

export function dateTomorrow() {
  return new Date(Date.now() + 3600 * 1000 * 24);
}

export function truncatedBech(bech32, length) {
  return `${bech32.substring(0, length || 9)}...`;
}

export async function copyToClipboard(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export function pointerForList(list) {
  switch (list.kind) {
    case 10000:
    case 10001:
      return nip19.noteEncode(list.listId);
    case 30000:
    case 30001:
      return nip19.naddrEncode({
        identifier: list.name,
        kind: list.kind,
        pubkey: list.authorHexPubkey
      });
    default:
      break;
  }
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
