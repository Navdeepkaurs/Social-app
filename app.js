const express = require("express");    
const app = express(); 
const cookieParser = require("cookie-parser"); // Import middleware to parse cookies

// Importing custom route handlers 
const authRoutes = require("./auth");         // Routes for user authentication (login, signup, etc.)
const postRoutes = require("./post");         // Routes for handling posts (creating, deleting, liking posts, etc.)
const followRoutes = require("./follow");     // Routes for handling follow actions (following/unfollowing users)
               

// Middleware setup
app.use(express.json());                      // Middleware to automatically parse JSON in request bodies
app.use(cookieParser());                      // Middleware to parse cookies from incoming requests

// Error handling middleware
app.use((err, req, res, next) => {            // This middleware catches errors that occur in the app
  if (err.name === "UnauthorizedError") {     // If the error is due to an invalid token (e.g., in authentication)
    return res.status(401).json({ message: "Invalid token" }); // Send a 401 Unauthorized response with a message
  }
  next();                                     // If no error, pass control to the next middleware
});

// Setting up routes
app.use("/auth", authRoutes);                 // Use authentication routes for URLs starting with '/auth'
app.use("/post", postRoutes);                 // Use post-related routes for URLs starting with '/post'
app.use("/user", followRoutes);               // Use follow-related routes for URLs starting with '/user'

// Start the server on a specified port
const PORT = process.env.PORT || 3000;        // Use the port specified in environment variables or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and log a message
