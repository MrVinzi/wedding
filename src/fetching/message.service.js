import axios from 'axios'
import { callExtermalApi } from './external-api.service'

const apiServerUrl = 'api-fiverr-dev.queue-my.net'
const awsUrl = `${apiServerUrl}`

export function callPublic(params) {
  let url = `https://${awsUrl}/${params.entityPath}`
  if (params.pathNext) url = `${url}/${params.pathNext}`
  if (params.ID) url = `${url}/${params.ID}`

  const config = {
    url,
    method: params.method,
    withCredentials: false,
    headers: {
      'content-type': 'application/json',
    },
  }
  if (params.body) config.data = params.body

  return callExtermalApi({ config })
}

export async function get() {
  await axios.get('/user', {
    params: {
      ID: 12345,
    },
  })
}
