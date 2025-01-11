const express = require("express");//For setup express
const cors = require('cors');// For cors error
const dotenv = require('dotenv');//To setup the enviromential variable
const path = require('path');//To get the path
const connectDatabase = require('./config/connectDatabase');// To connect the server
const pageRoutes = require("./router/pagesRoutes")// To build the routes

// Initialize the Express app
const app = express();

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Connect to the database
connectDatabase();

// Middleware for JSON body parsing and CORS handling
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only the specific origin without trailing slash
    credentials: true,  // Ensure credentials (cookies, etc.) are allowed
}));
app.use('/api/v1/', pageRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
