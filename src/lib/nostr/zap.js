import { getLud16Single } from "./getLud16";

export const zap = async (npub) => {
  const lud16s = await getLud16Single(npub);
  console.log(lud16s);
  if (typeof window.webln !== 'undefined') {
    console.log('WebLN is available!');
    await window.webln.enable();

    const result = await webln.lnurl(lud16s[0]); // promise resolves once the LNURL process is finished (e.g. a payment is sent or the login is complete)			showResult(result);
    console.log(result);
  } else {
    alert(`WebLN is not available. Please install a WebLN compatible 
    browser extension (e.g. Alby).`);
  }
}