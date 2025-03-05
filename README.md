# Hospital Information System

The Hospital Information System is a full-stack application designed to manage hospital operations, including patient registration, doctor management, feedback collection, and more.
This project is built using Node.js, Express, MongoDB for the backend, and a modern frontend.

## Features

- Patient registration and management
- Doctor management
- Feedback collection and management
- Secure authentication using JSON Web Tokens (JWT)

## Prerequisites

Requirements:

- Node.js and npm installed on your machine
- MongoDB instance running (local or cloud-based), in this project we used a cloud-based MongoDB.

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/seifeldin1/Hospital-Information-System.git
   cd Hospital-Information-System/Back-End
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the Back-End directory and add the following environment variables:

   ```
   CONNECTION_STRING="mongodb://localhost:27017/Hospital"
   # Or the connection string of your online MongoDB
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

### Frontend

1. Navigate to the frontend directory:

   ```sh
   cd .\Front-End\
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Running the Project

### Backend

Navigate to the backend directory:

```sh
cd .\Back-End\
```

1. Compile the TypeScript files:

   ```sh
   npx tsc
   ```

2. Start the server:

   ```sh
   npm start
   ```

Alternatively, you can use nodemon for development:

```sh
nodemon app.ts
```

The server will be running on http://localhost:5000.

### Frontend

Navigate to the frontend directory:

```sh
cd .\Front-End\
```

Start the frontend development server:

```sh
npm start
```

The frontend will be running on http://localhost:3000 (or another port if specified).
