import * as core from '@actions/core'

import { kebabCase } from '../utils'

export async function action(
  func: () => Promise<Record<string, unknown> | undefined>,
) {
  try {
    const result = await func()

    if (result)
      Object.entries(result).forEach(([k, v]) =>
        core.setOutput(
          kebabCase(k),
          typeof v !== 'string' ? JSON.stringify(v) : v,
        ),
      )
  } catch (err) {
    core.setFailed(`${err}`)
  }
}
