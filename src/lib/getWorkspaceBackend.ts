import type { Backend } from '../backends'

export function getWorkspaceBackend(filePath: string, backends: Backend[]) {
  for (const backend of backends) {
    if (backend.isManifest(filePath)) {
      return backend
    }
  }

  return undefined
}
