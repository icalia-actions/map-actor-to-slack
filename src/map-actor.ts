import * as fs from 'fs'

interface ActorMap<T> {
  [index: string]: T
}

export function mapActor(actor: string, mapSource: string): string | undefined {
  let map: ActorMap<string>

  if (fs.existsSync(mapSource)) {
    map = JSON.parse(fs.readFileSync(mapSource, 'utf8'))
  } else {
    map = JSON.parse(mapSource)
  }

  return map[actor]
}
