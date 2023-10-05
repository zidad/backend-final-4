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
|   ├── userController.js
|   ├── addressController.js
|   ├── productController.js
|   ├── categoryController.js
|   ├── brandController.js
|   ├── discountController.js
|
├── middlewares/             # Route middlewares for the application
│   ├── index.js
│   ├── async.js
│   ├── error-Handler.js
│   ├── not-Found.js
|
├── models/                  # Models for the application
│   ├── connection.js
│   ├── userModel.js
│   ├── addressModel.js
│   ├── productModel.js
│   ├── categoryModel.js
│   ├── brandModel.js
│   ├── discountModel.js
|
├── routes/                  # Route handlers for the application
│   ├── index.js
│   ├── userRoutes.js
│   ├── addressRouts.js
│   ├── productRoutes.js
│   ├── categoryRouts.js
│   ├── brandRoutes.js
│   ├── discountRoutes.js
│
├── validators/              # Validators for the application
│   ├── index.js
│
├── utils/                   # Helper functions for the application
│   ├── index.js
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
* User Profiles: Users have their own profiles with customizable information.
* Address Profiles: Address have their own profiles with customizable information.
* Product Profiles: Product have their own profiles with customizable information.


## Routes

The application includes the following routes:
- **Home Page**: `/` - Displays the home page with general information.

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
