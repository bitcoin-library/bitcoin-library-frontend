import { json } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';

const getMetaTag = (doc, attribute, value) => {
  return (doc.querySelector(`meta[${attribute}="${value}"]`) &&
    doc.querySelector(`meta[${attribute}="${value}"]`).content) || null
}

const pageGetData = async (url) => {
  const response = await fetch(url)
  const html = await response.text()
  const { document } = new JSDOM(html).window;
  return {
    name: getMetaTag(document, 'property', 'og:title') ||
      getMetaTag(document, 'name', 'twitter:title') ||
      document.title,
    id: getMetaTag(document, 'property', 'og:url') ||
      window.location.href,
    description: getMetaTag(document, 'property', 'og:description') ||
      getMetaTag(document, 'name', 'twitter:description') ||
      getMetaTag(document, 'name', 'description'),
    author: getMetaTag(document, 'name', 'author'),
    image: getMetaTag(document, 'property', 'og:image') ||
      getMetaTag(document, 'name', 'twitter:image'),
    locale: getMetaTag(document, 'property', 'og:locale')
  }
}


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { url } = await request.json();
  const pageMetadata = await pageGetData(url)
  return json(pageMetadata);
}

