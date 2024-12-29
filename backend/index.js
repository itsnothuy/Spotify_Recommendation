// start.js
import app from './server.js';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${server.address().port}`);
  });

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${PORT} is in use. Trying another port...`);
      // Automatically find an available port
      const dynamicServer = app.listen(0, () => {
        console.log(`Server is now running on http://localhost:${dynamicServer.address().port}`);
      });
    } else {
      console.error('Server error:', err);
    }
});