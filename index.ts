import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/configs/db';
import cabinRoutes from './src/routers/cabinRoutes';
import guestRoutes from './src/routers/guestRoutes';
import bookingRoutes from './src/routers/bookingRoutes';
import settingRoutes from './src/routers/settingRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

// Log tất cả các yêu cầu để debug
app.use((req: Request, res: Response, next: Function) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Kết nối đến MongoDB
connectDB().catch(err => console.error('MongoDB connection error:', err));

app.use('/api', cabinRoutes);
app.use('/api/', guestRoutes);
app.use('/api/', bookingRoutes);
app.use('/api/', settingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Node.js with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`✅Server is running on port ${PORT}`);
});