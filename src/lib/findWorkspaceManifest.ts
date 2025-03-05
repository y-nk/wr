import type { Backend } from '../backends'
import { getWorkspaceFiles } from './getWorkspaceFiles'
import { readManifest } from './readManifest'

export async function findWorkspaceManifest(
  workspace: string,
  backends: Backend[],
) {
  const workspaceFiles = await getWorkspaceFiles(workspace)

  for (const backend of backends) {
    const filePath = workspaceFiles.find(file => backend.isManifest(file))

    if (filePath) {
      return readManifest(filePath, backend)
    }
  }

  return undefined
}
