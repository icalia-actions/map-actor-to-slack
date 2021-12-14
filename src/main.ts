import * as core from '@actions/core'
import {mapActor} from './map-actor'

async function run(): Promise<void> {
  try {
    const defaultMapping: string = core.getInput('default-mapping', {
      required: true
    })
    const mappingSource: string = core.getInput('actor-map', {required: true})

    const actor: string = process.env.GITHUB_ACTOR as string

    const actorMapping: string | undefined = mapActor(actor, mappingSource)

    if (actorMapping) {
      core.setOutput('actor-mapping', actorMapping)
    } else {
      core.warning(
        `The GitHub actor "${actor}" was not found on the provided actor map.`
      )
      core.setOutput('actor-mapping', defaultMapping)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
