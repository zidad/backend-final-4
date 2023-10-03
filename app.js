const express = require('express');
const app = express();

// Middleware Routes
const notFound = require('./middleware/not-Found')
const errorHandler = require('./middleware/error-Handler')

const users = require('./routes/userRoutes')
const addresses = require('./routes/addressRoutes')
const products = require('./routes/productRoutes')

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/users', users)
app.use('/api/addresses', addresses)
app.use('/api/products', products)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});