# Cartify

## Description
Caritify is a web-based application that handles user authentication, sessions, and data management. It uses bcrypt for password hashing, jsonwebtoken for session handling, and mongoose for MongoDB integration. Built with express, ejs for dynamic views, and multer for file uploads, it also includes flash messages and cookie management.

## Features
- **User Registration**: Create accounts with full name, email, and password.
- **User Login**: Securely log in to existing accounts.
- **Flash Messages**: Display temporary error messages for user feedback.
- **Owner Management**: An admin feature to manage owners (limited to one owner).
- **Environment Configuration**: Utilizes environment variables for secure configurations.

## Technologies Used
- **Backend**: Node.js, Express.js, Mongoose
- **Frontend**: EJS, HTML, CSS (Tailwind CSS)
- **Security**: 
  - **bcrypt** for password hashing
  - **jsonwebtoken** for secure authentication
- **Middleware**: 
  - **cookie-parser** for parsing cookies
  - **express-session** for session management
  - **connect-flash** for flash messages
  - **debug** for debugging applications
- **File Uploading**: **multer** for handling file uploads
- **Environment Management**: **dotenv** for managing environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rakeshroy007/Caritify
   cd cartify

2. ### Install the dependencies:

    ```bash
    npm install

3. ### Create a `.env` file in the root directory and add the following values:
        JWT_KEY = "secret_key"
        EXPRESS_SESSION_SECRET = "another_secret_key"
        NODE_ENV = "development"


- The `JWT_KEY` is used for signing JSON Web Tokens.
- The `EXPRESS_SESSION_SECRET` is used for securing the session.
- Setting `NODE_ENV` to `"development"` enables features for the owner management system.

4. Update your MongoDB access in the `development.json` file. Ensure that you have your own MongoDB connection string configured for the application.
## Usage
To start the application, run the following command:
        
        node .\app.js


Navigate to `http://localhost:3000` in your web browser to access the application.


## Owner Management:

- This application supports only one `Owner`.
- Ensure you manage the owner's access through the application interface.



## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

