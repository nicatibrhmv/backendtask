const express = require('express');
const app = express();

const products = [
  { id: 1, name: 'Product A', price: 20.99, quantity: 50 },
  { id: 2, name: 'Product B', price: 15.49, quantity: 30 },
  { id: 3, name: 'Product C', price: 10.99, quantity: 25 },
];

app.get('/products', (req, res) => {
  const { count = 10, offset = 0 } = req.query;

  const countInt = parseInt(count);
  const offsetInt = parseInt(offset);

  const paginatedProducts = products.slice(offsetInt, offsetInt + countInt);

  res.json(paginatedProducts);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
