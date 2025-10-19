import { type SchemaTypeDefinition } from 'sanity'
import member from './member'
import event from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, event],
}
