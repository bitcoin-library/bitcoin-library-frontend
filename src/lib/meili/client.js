import { MeiliSearch } from 'meilisearch';
import { MEILI_PW, MEILI_URL } from "$env/static/private"

export const client = new MeiliSearch({
  host: MEILI_URL,
  apiKey: MEILI_PW
});
