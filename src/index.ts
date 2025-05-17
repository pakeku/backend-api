// src/server.ts
import 'dotenv/config';
import { Server } from 'http';

import app from './app';
import { startDatabase, stopDatabase } from './database/mongo-common';

const PORT: number = parseInt(process.env.PORT ?? '3001', 10);
const MONGO_URL: string | undefined = process.env.MONGO_URL;

let server: Server | undefined;

function gracefulShutdown(signal: string): void {
  console.log(`\nReceived ${signal}, shutting down...`);
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
      stopDatabase()
        .then(() => {
          console.log('Database connection closed');
          process.exit(0);
        })
        .catch((err: unknown) => {
          console.error('Error during shutdown:', err);
          process.exit(1);
        });
    });
  } else {
    process.exit(0);
  }
}

async function startServer(): Promise<void> {
  if (!MONGO_URL) {
    // Gracefully handle missing DB config
    app.all('*', (req, res) => {
      res.status(500).send({
        message: 'MONGO_URL not configured. See documentation.',
      });
    });

    server = app.listen(PORT, () => {
      console.log(`Server running without DB on port ${PORT.toString()}`);
    });

    return;
  }

  try {
    await startDatabase();

    server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT.toString()}`);
    });
  } catch (err: unknown) {
    console.error('Failed to start database:', err);
    process.exit(1);
  }
}

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    gracefulShutdown(signal);
  });
});

void startServer();
