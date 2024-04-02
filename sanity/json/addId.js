const fs = require('fs')

async function addId() {
  try {
    const priceIdStore = require('./priceIdStore.mjs')

    const data = fs.readFileSync('stripe_products.json', 'utf8')
    const products = JSON.parse(data)

    // Modify the objects
    const updatedProducts = products.map((product) => {
      const subCategory = product.subCategory
      const title = product.title
      const size = product.size

      const subCategoryStore = priceIdStore[subCategory]
      if (subCategoryStore) {
        console.log(`Found subCategory: ${subCategory}`)
        const titleStore = subCategoryStore[title]
        if (titleStore) {
          console.log(`Found title: ${title}`)
          const id = titleStore[size]
          if (id) {
            console.log(`Found size: ${size}`)
            console.log(`Id: ${id}`) // Print the id value
            product.id = id // Create new id attribute with the value from priceIdStore
            console.log(product) // Print the product object
          }
        }
      }

      return product
    })

    // Write the modified JSON back to the file
    fs.writeFileSync('stripe_products.json', JSON.stringify(updatedProducts, null, 2))
    console.log('Data written to file successfully.')
  } catch (err) {
    console.error('Failed to process the file:', err)
  }
}

addId()
