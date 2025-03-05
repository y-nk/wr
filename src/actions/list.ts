import * as core from '@actions/core'

import { resolveBackends } from '../backends'
import { getWorkspaces } from '../lib/getWorkspaces'
import { action } from './utils'

action(async () => {
  const workspaces = await getWorkspaces(
    resolveBackends(core.getMultilineInput('backends')),
  )

  const shortnames = workspaces.map(name => name.split('/').at(-1)!)

  core.info(JSON.stringify({
    workspaces,
    shortnames,
    scopes: shortnames.join('\n'),
  }))

  return {
    workspaces,
    shortnames,
    scopes: shortnames.join('\n'),
  }
})
