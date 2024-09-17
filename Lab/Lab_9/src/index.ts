import express, { Application } from 'express';
import cors from 'cors';
import { booksRouter } from './routes/books';

const app: Application = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', booksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
