import { readFile } from 'node:fs/promises'

export interface ViteManifestEntry {
  file: string
  src?: string
  css?: string[]
  assets?: string[]
  imports?: string[]
  isEntry?: boolean
}

export type ViteManifest = Record<string, ViteManifestEntry>

export async function readManifest(path: string): Promise<ViteManifest> {
  const raw = await readFile(path, 'utf8')
  return JSON.parse(raw) as ViteManifest
}