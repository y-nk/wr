import type { Manifest } from '../backends'

export function manifestToMd({ name, version }: Manifest) {
  return `• ${name} (${version})`
}
