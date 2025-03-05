export type Backend = {
  MANIFEST: string
  PM: string
  VERSION: string
  isManifest: (filePath: string) => boolean
  parseManifest: (fileContent: string) => Promise<Manifest>
}

export type Manifest = {
  name: string
  version: string
}

export type ManifestWithPath = Manifest & {
  path: string
}
