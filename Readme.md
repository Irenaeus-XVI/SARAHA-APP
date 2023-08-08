# SARAHA-APP

SARAHA-APP is a backend application for user management and authentication. It's built using Node.js, Express.js, and MongoDB.

## Getting Started

To get started with the SARAHA-APP backend, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Irenaeus-XVI/SARAHA-APP.git
   ```
2. Install dependencies:
    ```sh
   cd SARAHA-APP
   npm install
   ```
3. Set up environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables. You can use the provided .env.example as a template.   

4. Start the server:

```sh 
    npm start
```

The server will start and listen on a specified port (default: 3000). You can access the API using tools like Postman or integrate it with your frontend application.


## Configuration

In the `.env` file, you need to provide values for the following environment variables:

- `SALT_ROUNDS`: Number of salt rounds for bcrypt hashing.
- `SECRET_KEY`: Secret key for generating JWT tokens.
- `EMAIL`: Email credentials for sending emails.
- `PASSWORD`: Password for the email account.
- `VERIFY_SECRET`: Secret key for email verification tokens.
- `MODE`: Application mode (dev, prod, etc.).

## Endpoints

- `POST /api/v1/user/signup`: Register a new user.
- `POST /api/v1/user/signin`: Log in a user.
- `GET /api/v1/user/verify/:token`: Verify user email.
- `POST /api/v1/messages/add`: Add a new message.
- `GET /api/v1/messages:` Get all messages.




## Global Error Handling and Status Codes

The application employs global error handling to ensure consistent error responses. HTTP status codes are utilized to indicate the nature of errors:

- `404`: Resource not found.
- `400`: Bad request - when the request is malformed or invalid.
- `409`: Conflict - when there is a conflict with the current state of the server (e.g., attempting to create a resource that already exists).
- `500`: Server error.

This approach helps maintain a standardized response format and enhances the user experience by providing meaningful error messages and appropriate HTTP status codes.




## Contributing

Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License.


    
