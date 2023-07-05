import { MeiliSearch } from 'meilisearch';

export const client = new MeiliSearch({
  host: 'http://search.bitcoin-library.org/',
  apiKey: 'MASTER_KEY'
});
