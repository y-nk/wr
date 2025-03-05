import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import { promisify } from 'node:util'

export const $ = promisify(exec)

export async function readFile(filePath: string) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return fileContent
  } catch (err) {
    return undefined
  }
}

export function kebabCase(str: string) {
  return str.replace(/\p{Lu}/gu, (match: string) => `-${match.toLowerCase()}`)
}
