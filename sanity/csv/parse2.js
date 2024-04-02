const fs = require('fs')
const vm = require('vm')

fs.readFile('priceIdStore.mjs', 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read the file:', err)
    return
  }

  // Remove "export default " from the start of the file content
  const js = data.replace('export default ', '')

  // Evaluate the JavaScript code
  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(`priceIdStore = ${js}`, sandbox)

  const newPriceIdStore = {}

  for (const [key, value] of Object.entries(sandbox.priceIdStore)) {
    const [name, sizeInfo] = key.split(', EU ')
    const [size, categoryInfo] = sizeInfo.split(' (US ')
    const category = categoryInfo.replace(')', '').split(' ').slice(-1)[0].toLowerCase()

    if (!newPriceIdStore[category]) {
      newPriceIdStore[category] = {}
    }

    if (!newPriceIdStore[category][name]) {
      newPriceIdStore[category][name] = {}
    }

    const sizeKey = `${category}_${size}`
    newPriceIdStore[category][name][sizeKey] = value
  }

  fs.writeFile(
    'priceIdStore.mjs',
    `export default ${JSON.stringify(newPriceIdStore, null, 2)}`,
    (err) => {
      if (err) {
        console.error('Failed to write to the file:', err)
      } else {
        console.log('Data written to file successfully.')
      }
    },
  )
})
