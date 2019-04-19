const { Polly, setupMocha } = require('@pollyjs/core')
const NodeHttpAdapter = require('@pollyjs/adapter-node-http')
const FSPersister = require('@pollyjs/persister-fs')

Polly.register(NodeHttpAdapter)
Polly.register(FSPersister)

function setupPolly(options) {
  return setupMocha(
    Object.assign(
      {},
      {
        adapters: ['node-http'],
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

exports.Polly = Polly
exports.setupPolly = setupPolly
