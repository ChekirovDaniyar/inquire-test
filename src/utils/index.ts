import {FetchArgs} from "./types"

export const objectToQueryParams = (object: any = {}): string => {
  return Object.keys(object).map((key) => `${key}=${object[key]}`).join('&')
}

const baseUrl = 'https://blog-api-t6u0.onrender.com'

export const fetchData = async ({url, params, body = null, method = "GET"}: FetchArgs) => {
  const res = await fetch(`${baseUrl}${url}?${objectToQueryParams(params)}`, {
    ...body ? {body: JSON.stringify(body)} : {},
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res.json()
}
