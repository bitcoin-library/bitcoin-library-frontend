
export const login = async () => {
  if (typeof window.nostr !== 'undefined') {
    console.log('nostr is available!');
    const pubKey = await window.nostr.getPublicKey()

    console.log(pubKey);
  } else {
    alert(`window.nostr is not available. Please install a compatible 
    browser extension (e.g. Alby).`);
  }
}
