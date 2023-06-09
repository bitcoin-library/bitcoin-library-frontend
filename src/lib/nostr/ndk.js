// Import the package
import NDK from "@nostr-dev-kit/ndk";
// Create a new NDK instance with explicit relays
export const relays = { explicitRelayUrls: ["wss://nostr.btc-library.com", "wss://relay.damus.io", "wss://relay.snort.social"] };

export const ndk = new NDK({ ...relays });
// Now connect to specified relays
await ndk.connect();

