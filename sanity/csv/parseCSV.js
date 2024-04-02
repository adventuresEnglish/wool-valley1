const fs = require('fs')
const csv = require('csv-parser')

const priceIdStore = {}

fs.createReadStream('prices (2).csv')
  .pipe(csv())
  .on('data', (row) => {
    const keys = Object.keys(row)
    const priceId = row[keys[0]] // First column
    const productName = row[keys[1]] // Second column
    priceIdStore[productName] = priceId
  })
  .on('end', () => {
    fs.writeFile(
      'priceIdStore.mjs',
      `export default ${JSON.stringify(priceIdStore, null, 2)}`,
      (err) => {
        if (err) {
          console.error('Failed to write to the file:', err)
        } else {
          console.log('Data written to file successfully.')
        }
      },
    )
  })
