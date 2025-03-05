import type { Backend } from '../backends'

export function findWorkspaceBackend(
  workspaceFiles: string[],
  backends: Backend[],
) {
  for (const backend of backends) {
    const hasManifest = workspaceFiles.find(file => backend.isManifest(file))

    if (hasManifest) {
      return backend
    }
  }

  return undefined
}
