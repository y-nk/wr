import * as core from '@actions/core'

import { resolveBackends } from '../backends'
import { getWorkspaceByName } from '../lib/getWorkspaceByName'
import { action } from './utils'

action(async () => {
  const workspace = await getWorkspaceByName(
    core.getInput('name'),
    resolveBackends(core.getMultilineInput('backends')),
  )

  core.info('--- resolved')
  core.info(JSON.stringify(workspace, null, 2))

  return workspace
})
