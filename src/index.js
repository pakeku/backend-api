const { app } = require('./app.js');
const { startDatabase } = require('./database/mongo-common.js');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

async function startServer() {
  if (!MONGO_URL) {
    // Gracefully handle missing DB config
    app.all('*', (req, res) => {
      res.status(500).send({
        message: 'MONGO_URL not configured. See documentation.',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running without DB on port ${PORT}`);
    });

    return;
  }

  try {
    await startDatabase();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();