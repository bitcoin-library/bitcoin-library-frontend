
export async function load({fetch}) {
  const res = await ( await fetch('/api/elastic/search_all', { method: 'POST', })).json()
  console.log("loading data")
  return res
}