import type { Manifest } from "./types"

export const MANIFEST = 'MODULE.bazel'

export const PM = ''

export const VERSION = ''

const FIELDS = {
  name: /name\s*=\s*"([^"]+)"/,
  version: /version\s*=\s*"([^"]+)"/,
}

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const result: Manifest = { name: 'unknown', version: '0.0.0' }

  // manual parsing of `MODULE.bazel`
  for (const [prop, regexp] of Object.entries(FIELDS)) {
    const match = content.match(regexp)
    if (match) result[prop] = match[1]
  }

  return result
}
