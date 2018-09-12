import 'cross-fetch/polyfill'
import { Polly, setupMocha } from '@pollyjs/core'
import FetchAdapter from '@pollyjs/adapter-fetch'
import FSPersister from '@pollyjs/persister-fs'

Polly.register(FetchAdapter)
Polly.register(FSPersister)

export default Polly

export function setupPolly(options) {
  return setupMocha(
    Object.assign(
      {},
      {
        adapters: ['fetch'],
        persister: 'fs',
        persisterOptions: {
          fs: {
            recordingsDir: 'test/recordings'
          }
        }
      },
      options
    )
  )
}
