const fs = require('fs')

let entries = []

let product = [
  [
    'fuscia',
    "These little booties will keep their feet toasty even on a chilly morning. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'doodle mini',
    "Doodling can be fun and unlock creative potential. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'tiger',
    "For little tiger roaming the halls. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'gulls',
    "For the little gulls squawking about the living room. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'circle',
    "Do you remember spinning around in circles as a child? All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'red laser',
    "These little booties will keep their feet toasty even on a cold morning. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'ice follies',
    "These little booties will keep their feet toasty even on a cold morning. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'christmas vine',
    "These are sure to light up a chilly night. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'mouse patrol',
    "KEEP AWAY FROM CATS. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'monster patrol',
    "For the little monsters you love all the same. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'wanderer',
    "For those who love to wander in style and warmth. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'aqua mice',
    "For little critters who love water. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
  [
    'etiquette',
    "A proper slipper for a proper child. Nothing less, nothing more. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottoms.",
  ],
]

for (let i = 0; i <= 12; i++) {
  let id = `baby_kid_${String(i + 1).padStart(3, '0')}`
  let name = product[i][0]
  let entry = {
    _id: id,
    _type: 'product',
    name: capitalize(name),
    images: [
      {_type: 'image', _sanityAsset: `image@file:///d:/wool-valley-slippers1/baby_kid/${id}_1.jpg`},
    ],
    description: product[i][1],
    alt: `Hand-felted Wool Valley Slippers made in Peru. Model: ${capitalize(name)}`,
    slug: {current: slugify(name)},
    price: 5999,
    currency: 'USD',
    category: {_type: 'reference', _ref: 'e184a0a2-8e95-4e54-be2e-9e0b15444346'},
  }
  entries.push(entry)
}

fs.writeFileSync('baby_kid.ndjson', entries.map((e) => JSON.stringify(e)).join('\n'))

function capitalize(str) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase()
  })
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}
