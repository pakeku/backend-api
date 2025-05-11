// Centralized error-handling middleware for Express
// Logs the stack trace and sends a structured response to the client.

const errorHandler = (err, req, res, next) => {
    // Log detailed error for debugging
    console.error(`[ERROR] ${err.stack}`);

    // Customize error response based on environment
    const response = {
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
    };

    res.status(500).json(response);
};

module.exports = errorHandler;  