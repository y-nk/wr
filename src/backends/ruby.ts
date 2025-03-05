import type { Manifest } from './types'

export const MANIFEST = '.gemspec'

export const PM = 'gem'

export const VERSION = `ruby --version | awk '{print $2}'`


const FIELDS = {
  name: /spec\.name\s*=\s*["'](.*?)["']/,
  version: /spec\.version\s*=\s*["'](.*?)["']/,
}

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const result: Manifest = { name: 'unknown', version: '0.0.0' }

  // manual parsing of `.gemspec`
  for (const [prop, regexp] of Object.entries(FIELDS)) {
    const match = content.match(regexp)
    if (match) result[prop] = match[1]
  }

  return result
}
