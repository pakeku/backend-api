const app = require('./app.js');
const { startDatabase, stopDatabase } = require('./database/mongo-common.js');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

let server;

async function startServer() {
  if (!MONGO_URL) {
    // Gracefully handle missing DB config
    app.all('*', (req, res) => {
      res.status(500).send({
        message: 'MONGO_URL not configured. See documentation.',
      });
    });

    server = app.listen(PORT, () => {
      console.log(`Server running without DB on port ${PORT}`);
    });

    return;
  }

  try {
    await startDatabase();

    server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start database:', err);
    process.exit(1);
  }
}

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}, shutting down...`);
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      await stopDatabase();
      console.log('Database connection closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Listen for shutdown signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => gracefulShutdown(signal));
});

startServer();