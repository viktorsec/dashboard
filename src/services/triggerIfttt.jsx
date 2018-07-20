import http from 'http'
import url from 'url'
import {IftttWebhookKey} from './../config/apiKeys'

export default function triggerIfttt(event, value1, value2, value3) {
  const endpoint = `https://maker.ifttt.com/trigger/${event}/with/key/${IftttWebhookKey}`
  const payload = JSON.stringify({value1, value2, value3})
  const {hostname, port, path} = url.parse(endpoint)

  const options = {
    hostname: hostname,
    port: port,
    path: path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
    },
  }

  const request = http.request(options, res => {
    res.setEncoding('utf8')
    res.on('data', chunk => {
        console.log('Response: ' + chunk)
    })
  })

  request.write(payload)
  request.end()
}
