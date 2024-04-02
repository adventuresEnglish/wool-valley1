const fs = require('fs')

let entries = []

let product = [
  [
    'swirl',
    "These one-of-a-kind slippers are laid back with just a subtle astetic touch. Embrace the swirl and bring a little attention, but not too much attention to your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'rumi',
    "Rumi, the Quechua word for rock, is the essence of these feet huggers. Stay soft, tread rugged. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'night',
    "When the sun goes down, the slippers slide on. Step into the night in style in these dark blue beauties. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'whirlpool',
    "Do you love the water but like to stay dry? Go ahead, dip you feet in. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'chiri unu',
    "Chiri Uno means cold water in the Andes region of Peru. These slippers are ice cold, but will keep your feet toasty anyway. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'pink lazer',
    "These slippers are not afraid of contrast. Stand out from the crowd. Embrace the spirit of pink laser. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'forest',
    "The quiet of deep forest. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'equilibrium',
    "Find your center in between these slippers. Life is all about balance. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'snow leopard',
    "Be fierce. Trot like a snow leopard. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'storm',
    "Storms come and go. Ride out the tumults of winter in these tough coasters. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'ice born',
    "These slippers are ice cold, but will keep your feet toasty anyway. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'hunter',
    "Keep a low profile while you gather what is needed for the pack. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'granite',
    "For those who are hard as rock but soft on the inside. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'superb',
    "Add an element of sophistication to your morning routine. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'anaconda dreams',
    "Move with power. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'nazca',
    "Inspired by ancient lines of the Nazca lines. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'camel',
    "It gets chilly in the desert, too. Wrap your hooves up. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'argile',
    "Bring the business to the breakfast table. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cloud break',
    "Let the sun rip through those groggy clouds. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'stash',
    "Every body loves a healthy stash. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'fuego',
    "Lose yourself in the flames. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'thicket',
    "Inspired by the wilds, but suitable for your home. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'zig',
    "Life takes us in many directions. Lead the way in comfort. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'starflower',
    "Show your love for flowers no matter what season it is. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'albatross',
    "Fly like an albatross. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'amaranth',
    "These cuddlebugs are inspired by the wild amaranth that grows in Peruvian Andes. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'sidewinder',
    "Blaze a new trail. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'flower power',
    "Be free. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'sol y luna',
    "End the day with some peace. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'daisy',
    "Strong, firm but also soft. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'estrella',
    "Lay a blanket out on the grass. Star gaze on a cool fall evening. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'rooibos',
    "A hot tea, a bit of spice, but for your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'peacock',
    "Both vibrant and in harmony with the surroundings. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'coca',
    "The Coca leaf is a national treasure of Peru. Let the medicine envelop your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'lily',
    "Bob on the waters of life with grace—and warm feet! All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'red eye',
    "The weary traveler deserves a respite. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'colibri',
    "Colibri, the hummingbird, is the symbol strength and endurance. They heal the sick and are your best ally in battle. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'carnation',
    "Spread the joy on your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cardinal',
    "The perfect blend of pizzaz and refinement. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'doodle',
    "Research suggests that a good doodle can unlock creative possibilities. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'serenity',
    "Invite serenity into your life. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'daisy chain',
    "Wrap your feet up in these floral designs. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'amaranth II',
    "These cuddlebugs are inspired by the wild amaranth that grows in Peruvian Andes. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cotton candy',
    "Embrace the fluff. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'mar',
    "For those who long for the sea. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cantuta',
    "The Cantuta was a sacremntal flower of the Incas and is still used to today in Andean festivities and funerals. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'star power',
    "Show your love for the sea on your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'heart',
    "Display your bubbly feelings on your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'pocadot',
    "It's ok. Be zany. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'flower',
    "Poise and grace. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'devine',
    "Shower your feet with floral feelings. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'kuychi',
    "Kuychi, Quechua for rainbow, is a symbol of hopeand adorns the official flag of Cusco, Peru. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'lattice',
    "Let the lattice of your life sprawl with reckless abandon. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'star child',
    "Are you a child of the stars? All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'two of hearts',
    "It's better to love and lose than to never love at all. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'heart vine',
    "The vine of love is always present. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'incognito',
    "Slip your feet in and hide away. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'may day',
    "Can't wait for Spring? Wear it on your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cantuta II',
    "The Cantuta was a sacremntal flower of the Incas and is still used to today in Andean festivities and funerals. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'sparkles',
    "Add a bit of sparkle to dreary day. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'fire vine',
    "Embrace the heat. Warm your feet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'cantuta III',
    "The Cantuta was a sacremntal flower of the Incas and is still used to today in Andean festivities and funerals. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'peacock II',
    "Both vibrant and in harmony with the surroundings. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'hearts away',
    "It's better to love and lose than to never love at all. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'arcoiris',
    "Arcoiris, Spanish for rainbow, is a symbol of hope and adorns the official flag of Cusco, Peru. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'purple rose',
    "Roses come in many colors. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'calendula',
    "Calendula grows freely in the Andes. Wrap your feet in their essence. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'peace',
    "We can always allow a little more peace into our lives. Comfortable feet help. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'lokum',
    "Swaddle your feet with something sweet. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'may flower',
    "Spring is right around the corner, but you don't have to wait to celebrate. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'ice petals',
    "Certain Andean flowers can become covered without skipping a beat. A warm pair of slippers doesn't hurt though. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'colibri II',
    "Colibri, the hummingbird, is the symbol strength and endurance. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'sun and moon',
    "Give your feet a soft landing after a long day. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'undergrowth',
    "The undergrowth sustains life. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'whimsy',
    "Invite whimsy into your life. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'coca trail',
    "The Coca leaf is a national treasure of Peru. All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
  [
    'star path',
    "Are you a child of the stars? Show it off! All of our slippers are naturally-dyed and hand-felted with high-quality sheep's wool and feature durable leather bottom.",
  ],
]

for (let i = 0; i <= 76; i++) {
  let id = `adults_${String(i + 1).padStart(3, '0')}`
  let name = product[i][0]
  let entry = {
    _id: id,
    _type: 'product',
    name: capitalize(name),
    images: [
      {_type: 'image', _sanityAsset: `image@file:///d:/wool-valley-slippers1/adults/${id}_1.jpg`},
      {_type: 'image', _sanityAsset: `image@file:///d:/wool-valley-slippers1/adults/${id}_2.jpg`},
      {_type: 'image', _sanityAsset: `image@file:///d:/wool-valley-slippers1/adults/${id}_3.jpg`},
    ],
    description: product[i][1],
    alt: `Hand-felted Wool Valley Slippers made in Peru. Model: ${capitalize(name)}`,
    slug: {current: slugify(name)},
    price: 5999,
    currency: 'USD',
    category: {_type: 'reference', _ref: '0b9fb58a-5ec9-4e2c-8ba8-7190d1492a3e'},
  }
  entries.push(entry)
}

fs.writeFileSync('adults.ndjson', entries.map((e) => JSON.stringify(e)).join('\n'))

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
