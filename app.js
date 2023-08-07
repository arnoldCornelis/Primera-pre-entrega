const express = require('express');
const fs = require('fs');
const routerProducts= require ('./src/routes/products.js');
const routerCarts= require ('./src/routes/carts.js');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//use routers
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});