/* global addEventListener fetch Response */

addEventListener('fetch', event => {
  event.respondWith(dispatch(event.request))
})

const AREA_PATHNAME_RX = /^\/area\/[A-Z]+\/?$/
const POSTCODE_PATHNAME_RX = /^\/postcode\/[A-Z0-9]+\/[A-Z0-9]+\/?$/
const SEARCH_PATHNAME_RX = /^\/search$/
const SIGN_PATHNAME_RX = /^\/sign\/([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\/?$/

const VALID_PATHNAME_RXS = [
  AREA_PATHNAME_RX,
  POSTCODE_PATHNAME_RX,
  SEARCH_PATHNAME_RX,
  SIGN_PATHNAME_RX
]

async function dispatch(request) {
  const url = new URL(request.url)
  if (!VALID_PATHNAME_RXS.some(rx => rx.test(url.pathname))) {
    return fetch(request)
  }

  // Render index.html. React Router will then render the right thing.
  const response = await fetch(url.origin)
  let body = await response.text()
  body = mungeOgUrl(body, url)

  const signMatch = url.pathname.match(SIGN_PATHNAME_RX)
  if (signMatch) {
    body = mungeSignOgImage(body, url, signMatch[1])
  }

  const responseInit = {
    headers: { 'Content-Type': 'text/html' }
  }
  return new Response(body, responseInit)
}

function mungeOgUrl(body, url) {
  return body.replace(
    /<meta property="og:url" content=".+?">/,
    `<meta property="og:url" content="${url.toString()}">`
  )
}

function mungeSignOgImage(body, url, signUuid) {
  return body.replace(
    /<meta property="(og|twitter):image" content=".+?">/g,
    `<meta property="$1:image" content="${url.origin}/signs/${signUuid}">`
  )
}
