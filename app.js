const express = require('express');
const process = require('process');
const app = express();

// Middleware Routes
const { notFound, errorHandler } = require('./middleware');

const {
  addressRoutes,
  cartRoutes,
  productRoutes,
  userRoutes,

  
  ratingReviewRoutes,
} = require('./routes');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.use('/api/ratingreviews', ratingReviewRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
