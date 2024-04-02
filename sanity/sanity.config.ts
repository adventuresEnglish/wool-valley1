import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Wool Valleys',

  projectId: 'c8kajeh8',
  dataset: 'slippers',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
