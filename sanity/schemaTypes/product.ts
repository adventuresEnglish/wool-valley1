export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'price_id',
      title: 'Price ID',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'bestOf',
      title: 'Best Of?',
      type: 'boolean',
    },
    {
      name: 'includeBestOfImage',
      title: 'Include Best Of Image?',
      type: 'boolean',
      hidden: ({parent}: any) => !parent.bestOf,
    },
    {
      name: 'bestOfImage',
      type: 'image',
      title: 'Best Of Image',
      hidden: ({parent}: any) => !parent.includeBestOfImage || !parent.bestOf,
      options: {hotspot: true},
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      initialValue: 'Hand-felted Wool Valley Slippers made in Peru. Model:',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'style',
      title: 'Style',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'style'}]}],
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      default: 'USD',
    },
  ],
}
