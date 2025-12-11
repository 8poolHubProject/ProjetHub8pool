// src/index.ts (ou server.ts)
import express, { type Response } from 'express';
import cors from 'cors';
import { authMiddleware } from '././Infrastructure/auth.middleware.js';
import type { AuthRequest } from '././Infrastructure/auth.middleware.js';
import { auth } from 'firebase-admin';
import { createBooking } from './Controllers/booking-controller.js';

const app = express();
app.use(cors());
app.use(express.json());

//testci

app.get('/api/public', (req, res) => {
  res.send('Ceci est une route PUBLIQUE.');
});

app.get('/api/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.send(`Bonjour, ${req.user?.email} (UID: ${req.user?.uid})`);
});

app.post('/api/bookings', authMiddleware, createBooking);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});
