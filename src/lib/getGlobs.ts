import { parse } from 'yaml'

import { readFile } from '../utils'

const CONFIGS = [
  {
    files: ['workspaces.yaml', 'workspaces.yml'],
    prop: 'workspaces',
  },
  {
    files: ['pnpm-workspace.yaml'],
    prop: 'packages',
  },
]

export async function getGlobs() {
  for (const config of CONFIGS) {
    for (const filePath of config.files) {
      const fileContent = await readFile(filePath)

      if (fileContent) {
        const yaml = parse(fileContent)
        return yaml[config.prop] as string[]
      }
    }
  }

  return ['**']
}
