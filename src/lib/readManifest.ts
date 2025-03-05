import { readFile } from 'fs/promises'
import type { Backend } from '../backends'

export async function readManifest(filePath: string, backend: Backend) {
  return readFile(filePath, 'utf-8').then(content =>
    backend.parseManifest(content),
  )
}
