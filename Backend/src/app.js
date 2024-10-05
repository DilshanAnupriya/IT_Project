// Importing the required dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { DB_connection } = require('./config/db');

/**
 * Load environment variables from the .env file.
 * Configures the application to use the specified PORT and MongoDB URI.
 */
dotenv.config();

// Set the PORT to either the environment variable or 3000 as a default.
const PORT = process.env.PORT || 3000;

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS) to allow API access from other domains
app.use(cors());

/**
 * Establish a connection to the MongoDB database using the DB_connection function.
 * Logs success or failure messages depending on the connection status.
 */
DB_connection();

// Importing the review and complaint routes
const reviewRoute = require('./routes/reviews.route.js');
const complaintRoute = require('./routes/complaints.route.js');

/**
 * Route Handler: All routes related to complaints are prefixed with `/api/complaint`.
 * Example routes:
 *  - POST /api/complaint/add
 *  - GET /api/complaint/read
 *  - PUT /api/complaint/update/:id
 *  - PUT /api/complaint/replies/:id
 *  - DELETE /api/complaint/deletes/:id
 */
app.use('/api/complaint', complaintRoute);

/**
 * Route Handler: All routes related to reviews are prefixed with `/api/review`.
 * Example routes:
 *  - POST /api/review/add
 *  - GET /api/review/read
 *  - PUT /api/review/update/:id
 *  - PUT /api/review/replies/:id
 *  - DELETE /api/review/deletes/:id
 */
app.use('/api/review', reviewRoute);

/**
 * Starts the server and listens on the specified PORT.
 * Logs a message to the console when the server is successfully running.
 */
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});
