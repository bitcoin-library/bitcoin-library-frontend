import { getEvent } from '$lib/nostr/getEvent';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const event = await getEvent(params.id)
  return {
    list: event,
    event,
  };
}
