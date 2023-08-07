const express = require("express");
const router = express.Router();
const { uploader } = require('../../utils');
//definir rutas


const productsFilePath = 'productos.json';

// Función para leer los productos desde el archivo JSON
function readProductsFromFile() {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
}

// Función para escribir los productos en el archivo JSON
function writeProductsToFile(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
}

let productIdCounter = 1;


router.get('/', (req, res) => {
    // Listar todos los productos
    const products = readProductsFromFile();
    res.json(products);
  });

  router.get('/:pid', (req, res) => {
    // Obtener un producto por su id
    const products = readProductsFromFile();
    const product = products.find((p) => p.id === req.params.pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
  
  router.post('/',uploader.single('thumbnails'), (req, res) => {
    // Agregar un nuevo producto
  
    const newProduct = {
      id: productIdCounter++, 
      title: req.body.title ?? 'sin titulo',
      description: req.body.description ?? 'sin description',
      code: req.body.code ?? 'sin codigo',
      price: req.body.price ?? 'sin precio',
      status: true,
      stock: req.body.stock ?? 'sin stock',
      category: req.body.category ?? 'sin categoria',
      thumbnails: req.file ? req.file.originalname : 'sin foto',
    };
  
    const products = readProductsFromFile();
    products.push(newProduct);
    writeProductsToFile(products);
  
    res.status(201).json(newProduct);
  });
  
  router.put('/:pid', uploader.single('thumbnails'), (req, res) => {
    // Actualizar un producto por su id
  
    const products = readProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === req.params.pid);
  
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        title: req.body.title ?? 'sin titulo',
        description: req.body.description ?? 'sin description',
        code: req.body.code ?? 'sin codigo',
        price: req.body.price ?? 'sin precio',
        status: true,
        stock: req.body.stock ?? 'sin stock',
        category: req.body.category ?? 'sin categoria',
        thumbnails: req.file ? req.file.originalname : 'sin foto',
      };
      writeProductsToFile(products);
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
  
  router.delete('/:pid', (req, res) => {
    // Eliminar un producto por su id
    const products = readProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === req.params.pid);
  
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      writeProductsToFile(products);
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
  










module.exports = router;