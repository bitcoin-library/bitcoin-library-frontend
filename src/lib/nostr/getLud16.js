import { SimplePool, nip19, relayInit } from 'nostr-tools';

const convertNbpubToPk = (nbpub) => {
	return nip19.decode(nbpub).data;
};

const pool = new SimplePool();

let relays = [
	// 'wss://nostr.btc-library.com',
	// 'wss://nostr.bitcoiner.social',
	'relay.damus.io',
	'relay.snort.social'
];

const parseEvent = (event) => {
  const content = JSON.parse(event.content)
  console.log(content)
  const lud16 = content.lud16 || ""
  return lud16
}

export const getLud16Single = async (nbpub) => {
	let pk = convertNbpubToPk(nbpub);
	const relay = relayInit('wss://relay.damus.io');
	relay.on('connect', () => {
		console.log(`connected to ${relay.url}`);
	});
	relay.on('error', () => {
		console.log(`failed to connect to ${relay.url}`);
	});

	await relay.connect();

  let events = await relay.list([{
    authors: [pk],
    kinds: [0]
    }])

  console.log(events)
  const lud16s = events.map(parseEvent)
  return lud16s
};

export const getLud16 = async (nbpub) => {
	let pk = convertNbpubToPk(nbpub);
	console.log(pk);
  return new Promise((resolve) => {
    let events = pool.list(relays, [{ kinds: [0, 1] }]);
    // let events = await pool.list(relays, [{
    // 	authors: [pk],
    //   kinds: [0]
    // }]);
  
    resolve(events)
  })

};
