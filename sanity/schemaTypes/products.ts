export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Name of product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'string',
      title: 'Product description',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Product price',
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Product category',
      to: [
        {
          type: 'category',
        },
      ],
    },
  ],
}
