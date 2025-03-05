import { $ } from '../utils'

export async function getWorkspaceFiles(workspace: string) {
  return $(`find ${workspace} -maxdepth 1 -type f`).then(({ stdout }) =>
    stdout.split('\n').filter(Boolean),
  )
}
