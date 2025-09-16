import * as bazel from './bazel'
import * as nodejs from './nodejs'
import * as python from './python'
import * as ruby from './ruby'
import * as rust from './rust'

export * from './types'

export const BACKENDS = { bazel, nodejs, python, ruby, rust } as const

export type BackendType = keyof typeof BACKENDS

export function isBackend(backend: string): backend is BackendType {
  return Object.keys(BACKENDS).includes(backend)
}

export function resolveBackends(types?: string[]) {
  return types?.length
    ? types.filter(isBackend).map(type => ({
      type,
      ...BACKENDS[type]
    }))
    : Object.entries(BACKENDS).map(([type, backend]) => ({
      type,
      ...backend
    }))
}
