import * as core from '@actions/core'

import { resolveBackends, type ManifestWithPath } from '../backends'
import { findWorkspaceBackend } from '../lib/findWorkspaceBackend'
import { findWorkspaceManifest } from '../lib/findWorkspaceManifest'
import { getStructuredDiff } from '../lib/getStructuredDiff'
import { getWorkspaceDiffState } from '../lib/getWorkspaceDiffState'
import { getWorkspaceFiles } from '../lib/getWorkspaceFiles'
import { getWorkspaces } from '../lib/getWorkspaces'
import { manifestToMd } from '../lib/manifestToMd'
import { action } from './utils'

action(async () => {
  const base = core.getInput('base')
  const head = core.getInput('head')
  const backends = resolveBackends(core.getMultilineInput('backends'))

  const workspaces = await getWorkspaces(backends)
  const diff = await getStructuredDiff(base, head, workspaces)

  core.info('--- workspaces')
  core.info(JSON.stringify({ workspaces }, null, 2))

  core.info('--- diff')
  core.info(JSON.stringify({ diff }, null, 2))

  const modified: ManifestWithPath[] = []
  const bumped: ManifestWithPath[] = []
  const conflicting: ManifestWithPath[] = []

  for (const workspace of Object.keys(diff)) {
    const workspaceFiles = await getWorkspaceFiles(workspace)
    const backend = findWorkspaceBackend(workspaceFiles, backends)

    if (backend) {
      const { state, manifest } = await getWorkspaceDiffState(
        workspace,
        backend,
        base,
      )

      if (state === 'equal') {
        modified.push({ ...manifest, path: workspace })
      } else if (state === 'greater') {
        bumped.push({ ...manifest, path: workspace })
      } else {
        conflicting.push({ ...manifest, path: workspace })
      }
    } else {
      const manifest = await findWorkspaceManifest(workspace, backends)

      if (manifest) {
        modified.push({ ...manifest, path: workspace })
      }
    }
  }

  core.info('--- structured diff')
  core.info(JSON.stringify({ modified, bumped, conflicting }, null, 2))

  const all = [...modified, ...bumped, ...conflicting]

  return Object.entries({
    all,
    modified,
    bumped,
    conflicting,
  }).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: v,
      [`${k}Count`]: v.length,
      [`${k}Md`]: v.map(manifestToMd).join('\n'),
    }),
    {},
  )
})
