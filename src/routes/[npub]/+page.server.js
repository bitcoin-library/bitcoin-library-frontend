import { ndkStore } from '$lib/stores/ndk';
import { get } from 'svelte/store';

export const load = async ({ params }) => {
  const ndk = await get(ndkStore);
  try {

    const user = ndk.getUser({ npub: params.npub });

    return {
      pubkey: user.hexpubkey()
    };
  }
  catch (e) {
    return {}
  }
};
