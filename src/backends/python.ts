import { parse } from 'toml'

import type { Manifest } from './types'

export const MANIFEST = 'pyproject.toml'

export const PM = 'uv'

export const VERSION = `python --version | awk '{print $2}'`

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const { name, version } = parse(content).project as Manifest
  return { name, version }
}
