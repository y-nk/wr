import { $ } from '../utils'

export async function getStructuredDiff(
  base: string,
  head: string,
  workspaces: string[],
) {
  return $(`git diff --diff-filter=ACMR --name-only ${base} ${head}`).then(
    ({ stdout }) =>
      stdout
        .split('\n')
        .filter(Boolean)
        .reduce<Record<string, string[]>>((acc, file) => {
          // find out associated workspace
          const workspace = workspaces.find(workspace =>
            file.startsWith(workspace),
          )

          // build per-workspace diff list
          if (workspace) {
            acc[workspace] ??= []
            acc[workspace].push(file)
          }

          return acc
        }, {}),
  )
}
