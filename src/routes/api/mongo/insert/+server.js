import db from "$lib/db"
import { json } from '@sveltejs/kit';


export async function POST( {request}) {
  console.log(request)
  const body = await request.formData();
  const data = Object.fromEntries(body)
  const coll = db.collection("scrapy_items")
  const res = await coll.insertOne(
    data
    )
  console.log(res)
  return json(res)
}