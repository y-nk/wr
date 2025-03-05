import * as core from '@actions/core'

import { resolveBackends } from '../backends'
import { action } from './utils'

action(async () => {
  const backends = Object.fromEntries(
    resolveBackends(core.getMultilineInput('backends'))
      .map(backend => [backend.type, backend])
  )

  core.info('--- backends')
  core.info(JSON.stringify(backends, null, 2))

  return { backends }
})
