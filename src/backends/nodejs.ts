import type { Manifest } from './types'

export const MANIFEST = 'package.json'

export const PM = 'pnpm'

export const VERSION = `node --version | awk -F 'v' '{print $2}'`

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const { name, version } = JSON.parse(content) as Manifest
  return { name, version }
}
