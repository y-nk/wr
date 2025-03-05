import { gt } from 'semver'
import type { Manifest } from '../backends'

export function compareManifests(
  baseManifest: Manifest,
  headManifest: Manifest,
) {
  // manifest was not bumped
  if (baseManifest.version === headManifest.version) {
    return 'equal'
    // manifest was bumped
  } else if (gt(headManifest.version, baseManifest.version)) {
    return 'greater'
  }

  // manifest was bumped but outdated compared to base
  return 'lesser'
}

export type Comparison = ReturnType<typeof compareManifests>
