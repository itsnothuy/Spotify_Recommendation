import app from './server.js';

const PORT = 3001;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1); // Exit the process with an error code
    } else {
        console.error('Server error:', err);
    }
});
