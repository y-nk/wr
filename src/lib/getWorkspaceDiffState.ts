import { join } from 'node:path'
import type { Backend } from '../backends'
import { $ } from '../utils'
import { compareManifests } from './compareManifests'
import { readManifest } from './readManifest'

export async function getWorkspaceDiffState(
  workspace: string,
  backend: Backend,
  since: string,
) {
  const filePath = join(workspace, backend.MANIFEST)

  const baseManifest = await $(`git show ${since}:${filePath}`).then(
    ({ stdout }) => backend.parseManifest(stdout),
  )

  const headManifest = await readManifest(filePath, backend)

  const state = compareManifests(baseManifest, headManifest)

  return {
    manifest: headManifest,
    state,
  } as const
}
