# Notes App

A simple backend Notes application built with **Express.js**. Users can sign up, log in, create, read, update, and delete notes. Authentication is handled using **JWT** and cookies.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT, cookies
* **Other:** bcryptjs for password hashing, cors, dotenv

## Features

* User signup and login
* Protected routes with JWT authentication
* CRUD operations on notes
* Password hashing and secure token cookies

## Project Structure

```
my-project/
├─ backend/         # Express backend
├─ API.md           # API documentation
├─ README.md        # Project overview
```

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/baseergroot/Notes-App-Backend.git
```

2. Install dependencies

```bash
cd backend
pnpm install
```

3. Set up `.env` file in backend with:

```
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
```

4. Run backend

```bash
pnpm dev
```

## API Documentation

For detailed API routes, requests, and responses, see [API.md](API.md).

## License

This project is for learning purposes.
# Notes-App-Backend
