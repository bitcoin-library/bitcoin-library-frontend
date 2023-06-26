import { nip19 } from 'nostr-tools'

export function genNpub(pk) {
  let npub = nip19.npubEncode(pk)
  return npub
}

console.log(nip19.decode("npub1tjkc9jycaenqzdc3j3wkslmaj4ylv3dqzxzx0khz7h38f3vc6mls4ys9w3"))

