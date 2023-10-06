# PWA E-Commerce Website (Backend Part)

## Description

This is an e-commerce web application built using Node.js and the Express.js framework. An e-commerce website is an online platform for buying and selling products and services, providing convenient and accessible to users worldwide specialized in Accessories.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Links](#links)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
express-app/
│
├── app.js                   # Main Express application file
├── package.json             # Node.js package configuration
├── node_modules/            # Node.js project dependencies (not committed to version control)
|
├── config/                  # Configurations for the application
│   ├── config.js
|
├── controllers/             # Route Controllers for the application
│   ├── index.js
|   ├── addressController.js
|   ├── brandController.js
|   ├── cartController.js
|   ├── categoryController.js
|   ├── discountController.js
|   ├── index.js
|   ├── orderController.js
|   ├── paymentController.js
|   ├── productController.js
|   ├── ratingReviewController.js
|   ├── userController.js
|
├── middlewares/             # Route middlewares for the application
│   ├── index.js
│   ├── async.js
│   ├── error-Handler.js
│   ├── not-Found.js
|
├── models/                  # Models for the application
│   ├── addressModel.js
│   ├── brandModel.js
│   ├── cartItemModel.js
│   ├── cartModel.js
│   ├── categoryModel.js
│   ├── dscountModel.js
│   ├── index.js
│   ├── orderItemModel.js
│   ├── orderModel.js
│   ├── paymentModel.js
│   ├── productModel.js
│   ├── ratingReviewModel.js
│   ├── userModel.js
|
├── routes/                  # Route handlers for the application
│   ├── index.js
│   ├── userRoutes.js
│   ├── addressRouts.js
│   ├── productRoutes.js
│   ├── categoryRouts.js
│   ├── brandRoutes.js
│   ├── discountRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── ratingReviewRoutes.js
│
├── seeders/                 # Seeder functions for the adding data into database
│   ├── index.js
|
├── validators/              # Validators for the application
│   ├── index.js
│
├── utils/                   # Helper functions for the application
│   ├── index.js
│   ├── dataBaseConnection.js
│   ├── constants/           # Helper data seeders for filling the database with data
|   |   ├── userSeeder.js
│   ├── errors/              # Helper module/functions for handling errors across the application
|   |   ├── custom-error.js
|
├── services/                # Services for the application
│   ├── index.js
│
├── README.md                # Project documentation
│
├── .gitignore               # List of files and directories to be ignored by Git

```

## Installation

To run this project locally, follow these steps:

```
1. git clone https://github.com/JSD-0723/backend-final-4.git
2. cd backend-final-4
3. npm install
4. npm start
```

The application will be accessible at `http://localhost:5000` in your web browser.

## Usage

This web application includes the following features:

- Authentication: we provided "login" and "register" functionally for users using JWT authentication strategy.
- Users: User have their own profiles with customizable information.
- Address: Each user have multiple customizable addresses.
- Admin: We provided an admin user for managing the website data.
- Product: Searching and Filtering displayed products, also allowing the user to search for handpicked products with high rating and low price, and checking the new arrivals.
- Rating and Review: Users can add rating and reviews for products.
- Category: Fetching products based on categories, also allowed the user to check our latest feature categories.
- Brands: Fetching products based on brands.
- WishList: Each user is assigned with a list of desired products which he can add products to and delete from.
- Cart: Each user is assigned with a cart for managing his wanted products which he can add and delete from.
- Order: The user can order to buy products or cancel the order.
- Payment: We offer a payment methods for buying the products.

## Routes

Please check the API documentation for more information:

- [API Documentation and Routes](https://documenter.getpostman.com/view/25274258/2s9YJdWN5o)

## Links

- **DBschema** : [schema](https://drive.google.com/file/d/1oMzvGsL2REHWoVoemKOW1zyfqvW1-OLJ/view?usp=drive_link)

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the code passes linting and tests.
4. Submit a pull request explaining the changes you've made.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
