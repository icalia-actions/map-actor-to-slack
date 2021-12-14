import * as path from 'path'
import {mapActor} from '../src/map-actor'
import {expect, describe, it} from '@jest/globals'

const context = describe
const FIXTURE_FILES = path.resolve(__dirname, 'fixtures/files')

describe('Actor Mapper', () => {
  context('when given a JSON string as the map source', () => {
    it('maps an actor to a value in the parsed JSON string', () => {
      const exampleActor = 'example-actor'
      const exampleMapSource = '{"example-actor":"expected-mapping"}'
      expect(mapActor(exampleActor, exampleMapSource)).toBe('expected-mapping')
    })
  })

  context('when given the location of a JSON file as the map source', () => {
    it('maps an actor to a value in the parsed JSON file', () => {
      const exampleActor = 'example-actor'
      const exampleMapSource = path.resolve(FIXTURE_FILES, 'example-map.json')
      expect(mapActor(exampleActor, exampleMapSource)).toBe('expected-mapping')
    })
  })

  context('when the actor is not found in the map source', () => {
    it('returns undefined', () => {
      const exampleActor = 'example-unknown-actor'
      const exampleMapSource = '{"example-actor":"unexpected-mapping"}'
      expect(mapActor(exampleActor, exampleMapSource)).toBe(undefined)
    })
  })
})
