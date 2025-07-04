
# Minimalist Library Management Backend

A very simple and minimal library management backend built with pure Node.js (no frameworks like Express). It uses a JSON file for data storage, making it lightweight and easy to set up.

## Features

-   **Zero Dependencies:** Written in pure Node.js.
    
-   **Simple Database:** Uses a flat JSON file for data persistence.
    
-   **User Roles:** Differentiates between regular users and admins.
    
-   **Core Library Functions:** User registration, login, book management (CRUD), book reservations, and more.
    

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/ "null") installed on your system.
    
-   [npm](https://www.npmjs.com/ "null") (comes with Node.js).
    

### Installation & Setup

1.  **Clone the repository:**
    
    ```
    git clone https://github.com/Rahmat-JS/super-mini-book-management-system.git
    cd super-mini-book-management-system
    
    ```
    
2.  **Navigate to the source folder:** All commands should be run from within the `src` directory.
    
    ```
    cd src
    
    ```
    
3.  **Create/Reset the Database:** This command initializes a new `database.json` file or resets an existing one.
    
    ```
    npm run resetdb
    
    ```
    
4.  **Create an Admin User:** Run this command to create the first admin user. Your admin credentials (username and password) will be displayed in the console. **Save these credentials!**
    
    ```
    npm run createsuperuser
    
    ```
    
5.  **Run the Server:** To start the application, use the following command:
    
    ```
    npm start
    
    ```
    
    By default, the server will be running on `http://localhost:3000`.
    

## Configuration

You can easily change the default settings by editing the `src/config.js` file.

-   **Port:** Change the `port` variable to run the server on a different port.
    
-   **Database Name:** Change the `db_name` variable to use a different file for the database.
    

```
// src/config.js
module.exports = {
    port: 3000, // Change port here
    db_name: 'database.json' // Change database file name here
}

```

## API Endpoints

The following are the available API endpoints.

### Authentication

Method

Endpoint

Description

`POST`

`/api/register`

Registers a new user.

`POST`

`/api/login`

Logs in a user and returns a session token.

`POST`

`/api/logout`

Logs out the current user.

### User Actions

These endpoints require a valid session token in the request headers.

Method

Endpoint

Description

`GET`

`/api/books`

Retrieves a list of all available books.

`GET`

`/api/books/{bookId}`

Retrieves details for a specific book.

`PUT`

`/api/books/{bookId}/reserve`

Allows a user to reserve a book.

`PUT`

`/api/books/{bookId}/release`

Allows a user to hand over (release) a book.

### Admin Actions

These endpoints require admin privileges.

Method

Endpoint

Description

`POST`

`/api/books`

Adds a new book to the database.

`PUT`

`/api/books/{bookId}`

Updates the details of an existing book.

`DELETE`

`/api/books/{bookId}`

Removes a book from the database.

`PUT`

`/api/users/{userId}/promote`

Promotes a regular user to an admin.

`PUT`

`/api/users/{userId}/addcrime`

Adds a penalty or "crime" to a user's record.

## Contributing

This project is open for contributions! Feel free to fork the repository, make your changes, and submit a pull request.

1.  Fork the Project
    
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
    
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
    
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
    
5.  Open a Pull Request
    

## License

This project is distributed under the MIT License. See `LICENSE` for more information.