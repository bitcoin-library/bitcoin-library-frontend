import { getEvent } from '$lib/nostr/getEvent';
import { searchForEventIDs } from "$lib/meili/searchForEventIDs.js"
import { user } from '$lib/stores';
import { get } from "svelte/store";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const event = await getEvent(params.id)
  // const event = get(user).lists.find(list => list.id === params.id)
  return {
    list: event,
    event,
  };
}
