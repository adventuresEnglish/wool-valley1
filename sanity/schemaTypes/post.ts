export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'subTitle',
      type: 'string',
      title: 'Sub-Title',
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
    },
    {
      name: 'authorImage',
      type: 'image',
      title: 'Author Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'overview',
      type: 'string',
      title: 'Overview',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
  ],
}
