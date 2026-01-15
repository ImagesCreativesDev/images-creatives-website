import { type SchemaTypeDefinition } from 'sanity'
import member from './member'
import event from './event'
import competitionEntry from './competitionEntry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, event, competitionEntry],
}
