const fs = require('fs')

// Define the size categories
const SIZE_CATEGORIES = [
  {
    key: 'baby_kid',
    label: 'Baby/Kid',
    sizes: [
      {_key: 'baby_kid_17', eu: '17', us: '2'},
      {_key: 'baby_kid_18', eu: '18', us: '2.5'},
      {_key: 'baby_kid_19', eu: '19', us: '3.5'},
      {_key: 'baby_kid_20', eu: '20', us: '4.5'},
      {_key: 'baby_kid_21', eu: '21', us: '5.5'},
      {_key: 'baby_kid_22', eu: '22', us: '6'},
      {_key: 'baby_kid_23', eu: '23', us: '7'},
      {_key: 'baby_kid_24', eu: '24', us: '8'},
      {_key: 'baby_kid_25', eu: '25', us: '8.5'},
      {_key: 'baby_kid_26', eu: '26', us: '9.5'},
      {_key: 'baby_kid_27', eu: '27', us: '10'},
      {_key: 'baby_kid_28', eu: '28', us: '11'},
      {_key: 'baby_kid_29', eu: '29', us: '11.5'},
      {_key: 'baby_kid_30', eu: '30', us: '12'},
      {_key: 'baby_kid_31', eu: '31', us: '13'},
    ],
  },
  {
    key: 'adult_youth',
    label: 'Youth',
    sizes: [
      {_key: 'youth_32', eu: '32', us: '1'},
      {_key: 'youth_33', eu: '33', us: '2'},
      {_key: 'youth_34', eu: '34', us: '3'},
      {_key: 'youth_35', eu: '35', us: '3.5'},
      {_key: 'youth_36', eu: '36', us: '4'},
      {_key: 'youth_37', eu: '37', us: '5'},
      {_key: 'youth_38', eu: '38', us: '6'},
      {_key: 'youth_39', eu: '39', us: '7'},
    ],
  },
  {
    key: 'adult_youth',
    label: 'Adult',
    sizes: [
      {_key: 'adult_35', eu: '35', us: '4.5 W'},
      {_key: 'adult_36', eu: '36', us: '5.5 W'},
      {_key: 'adult_37', eu: '37', us: '6.5 W'},
      {_key: 'adult_38', eu: '38', us: '7.5 W'},
      {_key: 'adult_39', eu: '39', us: '6 M / 8.5 W'},
      {_key: 'adult_40', eu: '40', us: '7 M / 9.5 W'},
      {_key: 'adult_41', eu: '41', us: '8 M / 10.5 W'},
      {_key: 'adult_42', eu: '42', us: '9 M / 11.5 W'},
      {_key: 'adult_43', eu: '43', us: '10 M'},
      {_key: 'adult_44', eu: '44', us: '11 M'},
      {_key: 'adult_45', eu: '45', us: '12 M'},
      {_key: 'adult_46', eu: '46', us: '13 M'},
      {_key: 'adult_47', eu: '47', us: '14 M'},
    ],
  },
]

// Define the function to get the size label
function getSizeLabel(sizeValue) {
  for (const category of SIZE_CATEGORIES) {
    for (const size of category.sizes) {
      if (size._key === sizeValue) {
        return `EU ${size.eu} (US ${size.us} ${category.label})`
      }
    }
  }
  return null
}

fs.readFile('baby_kid.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read the file:', err)
    return
  }

  const products = JSON.parse(data)
  const modifiedProducts = []

  for (const product of products) {
    for (let size = 17; size <= 31; size++) {
      const modifiedProduct = {...product}

      // Change the "imageUrl" attribute to "image"
      modifiedProduct.image = modifiedProduct.imageUrl
      delete modifiedProduct.imageUrl

      // Change the "size" attribute
      modifiedProduct.size = `baby_kid_${size}`

      // Change the "price_id" attribute to "lookup_key"
      modifiedProduct.lookup_key = `${product.slug}_baby_kid_${size}`

      // Change the "name" attribute
      modifiedProduct.name = `${product.name}, ${getSizeLabel(`baby_kid_${size}`)}`

      // Add the "url" attribute
      modifiedProduct.url = `woolvalley.co/product/${product.slug}?size=baby_kid_${size}`

      // Add the "currency" attribute
      modifiedProduct.currency = 'USD'

      modifiedProducts.push(modifiedProduct)
    }
  }

  fs.writeFile('stripe_baby_kid.json', JSON.stringify(modifiedProducts, null, 2), (err) => {
    if (err) {
      console.error('Failed to write to the file:', err)
    } else {
      console.log('Data written to file successfully.')
    }
  })
})
