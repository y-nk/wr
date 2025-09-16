import { expect, it } from 'vitest'
import { resolveBackends } from '../src/backends'
import { getWorkspaceByName } from '../src/lib/getWorkspaceByName'

it.each(
  ['bazel', 'nodejs', 'python', 'ruby', 'rust']
)('should find the %s manifest file and return a manifest object', async (name) => {
  const workspace = await getWorkspaceByName(name, resolveBackends([name]))

  expect(workspace?.name).toBe(name)
  expect(workspace?.version).toBe('1.0.0')
})
