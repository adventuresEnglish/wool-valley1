const fs = require('fs')
const {createClient} = require('next-sanity')

async function fetchData() {
  const client = createClient({
    projectId: 'c8kajeh8',
    dataset: 'slippers',
    apiVersion: '2022-03-25',
    useCdn: true,
  })

  const getProductsData = async (category) => {
    const query = `*[_type == "product" && category->name == "${category}" ] | order(_createdAt asc){
      _id,
      price,
      name,
      alt,
      "slug": slug.current,
      "description": description,
      "categoryName": category->name,
      "imageUrl": images[0].asset->url,
      }`
    const data = await client.fetch(query)
    return data
  }

  const categoryData = await getProductsData('baby_kid')

  fs.writeFile('baby_kid.json', JSON.stringify(categoryData, null, 2), (err) => {
    if (err) {
      console.error('Failed to write to the file:', err)
    } else {
      console.log('Data written to file successfully.')
    }
  })
}

fetchData()
