
export function parseUrlHash(hash: string) {
  let params: { [index:string]: string } = {}
  let paramsString = hash.split("#")[1]
  if (!paramsString) return params;
  let parts = paramsString.split("&")
  parts.forEach(part => {
    const item = part.split('=');
    if (item[0]) {
      params[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
    }
  })
  return params
}

export function composeUrl(path: string, params: { [index:string]: string }  ) {
  let url = path;
  const args = []
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      args.push(key + "=" + params[key])
    }
  }
  if (args.length > 0) {
    url += "?" + args.join("&")
  }
  return url;
}