import { Router, Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  ISBN: string;
  publishedDate: string;
  author: string;
}

const books: Book[] = [];

const booksRouter: Router = Router();

// Create a new book
booksRouter.post('/', (req: Request, res: Response) => {
  const { id, title, ISBN, publishedDate, author } = req.body;
  const newBook: Book = { id, title, ISBN, publishedDate, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books
booksRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(books);
});

// Get a book by ID
booksRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find(b => b.id === parseInt(id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Update a book by ID
booksRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, ISBN, publishedDate, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === parseInt(id));

  if (bookIndex !== -1) {
    books[bookIndex] = { id: parseInt(id), title, ISBN, publishedDate, author };
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book by ID
booksRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === parseInt(id));

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

export { booksRouter };
