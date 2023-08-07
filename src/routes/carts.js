const express = require("express");
const router = express.Router();

// definir rutas

const cartsFilePath = 'carrito.json';

// Función para leer los carritos desde el archivo JSON
function readCartsFromFile() {
  const data = fs.readFileSync(cartsFilePath);
  return JSON.parse(data);
}

// Función para escribir los carritos en el archivo JSON
function writeCartsToFile(carts) {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
}

let cartIdCounter = 1;

router.post('/', (req, res) => {
  // Crear un nuevo carrito
  const newCart = {
    id: cartIdCounter++, 
    products: [],
  };

  const carts = readCartsFromFile();
  carts.push(newCart);
  writeCartsToFile(carts);

  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  // Obtener los productos de un carrito por su id
  const carts = readCartsFromFile();
  const cart = carts.find((c) => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  // Agregar un producto a un carrito por su id
  const { pid } = req.params;

  const carts = readCartsFromFile();
  const cartIndex = carts.findIndex((c) => c.id === req.params.cid);

  if (cartIndex !== -1) {
    const productIndex = carts[cartIndex].products.findIndex((p) => p.product === pid);

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity += 1;
    } else {
      carts[cartIndex].products.push({ product: pid, quantity: 1 });
    }

    writeCartsToFile(carts);
    res.json(carts[cartIndex]);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});
  
 






module.exports = router;