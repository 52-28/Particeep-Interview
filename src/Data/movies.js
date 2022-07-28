const movies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    likes: 0,
    dislikes: 0,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/cbe701b95e62f116b34eedf2ec58024c_4ee180ec-8c53-417b-bae8-b1ba8c8a4cf2_480x.progressive.jpg?v=1573655036'
  }, {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    likes: 2,
    dislikes: 0,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/864296d2d612a78ea6d8b84fa2b81964_63e24509-7504-4f7a-a675-ff2364cd4b94_480x.progressive.jpg?v=1573651332'
  }, {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    likes: 3,
    dislikes: 1,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4b4d0009af3539aee7f2f32ac75b5245_6dcc9a39-f9c7-4fc7-a155-f218d513a174_480x.progressive.jpg?v=1573616018'
  }, {
    id: '4',
    title: 'Sans un bruit',
    category: 'Thriller',
    likes: 6,
    dislikes: 6,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/quietplace2.reg.ar_480x.progressive.jpg?v=1585869316'
  }, {
    id: '5',
    title: 'Creed II',
    category: 'Drame',
    likes: 16,
    dislikes: 2,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/377eae5608665edac0e749b04d19af26_ec99b790-f5a6-4d5e-92ed-3830e40ba199_480x.progressive.jpg?v=1573651484'
  }, {
    id: '6',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 11,
    dislikes: 3,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/pulpfiction.2436_480x.progressive.jpg?v=1620048742'
  }, {
    id: '7',
    title: 'Saw 6',
    category: 'Horor',
    likes: 12333,
    dislikes: 32,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/c4b9f4ee0e2fb9ae04fe1c9b6b828f97_cbea20b0-22b9-4650-8da2-5a5b3f3c6065_480x.progressive.jpg?v=1573592592'
  }, {
    id: '8',
    title: 'Seven',
    category: 'Thriller',
    likes: 2,
    dislikes: 1,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/a1106cc8beb5e35d57cb00026ed250c9_8268f124-b4bc-4e8a-86ec-2d2a148b07b3_480x.progressive.jpg?v=1573651454'
  }, {
    id: '9',
    title: 'Inception',
    category: 'Thriller',
    likes: 2,
    dislikes: 1,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9c592dee1ac813fcaf8c93557a487557_675ff711-4f45-4a98-95a5-0f97302b2126_480x.progressive.jpg?v=1573618688'
  }, {
    id: '10',
    title: 'Gone Girl',
    category: 'Thriller',
    likes: 22,
    dislikes: 12,
    image: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/eda67ae550dc78188938237bca673e0f_f42bff46-bfcb-46b3-bdf8-24a8084bd820_480x.progressive.jpg?v=1573595097'
  },
];

export const movies$ = new Promise((resolve) => setTimeout(resolve, 1000, movies));
