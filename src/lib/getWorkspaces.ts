import { glob } from 'glob'
import { dirname } from 'node:path'

import type { Backend } from '../backends'
import { getGlobs } from './getGlobs'

export async function getWorkspaces(backends: Backend[]) {
  const globs = await getGlobs()

  const patterns = backends.flatMap(backend =>
    globs.map(glob => `${glob}/${backend.MANIFEST}`),
  )

  return glob(patterns).then(paths => paths.map(path => dirname(path)))
}
