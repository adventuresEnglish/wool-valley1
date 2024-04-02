const fs = require('fs')
const stripe = require('stripe')(
  'sk_test_51P08rCLJkZ8mI1nvFDlc8hRZk4BA1gSbNI6JO1KiLdU7Yi3WLinyBpfAvRBucXWxy0S0USheXlCCwll0byNSXxuI00Rv7JK8CM',
)

const products = JSON.parse(fs.readFileSync('./stripe_baby_kid.json', 'utf8'))

;(async () => {
  for (const product of products) {
    try {
      const stripeProduct = await stripe.products.create({
        description: product.description,
        images: [product.image],
        name: product.name,
        metadata: {
          category: product.categoryName,
          size: product.size,
          id: product.lookup_key,
          url: product.url,
        },
      })

      await stripe.prices.create({
        unit_amount: product.price,
        currency: 'usd',
        product: stripeProduct.id,
        lookup_key: product.lookup_key,
      })
    } catch (error) {
      console.error(`Error processing product ${product.name}:`, error)
    }
  }
})()
