
import express from 'express';
import bodyParser from 'body-parser';

// Import the routers
import usersRouter from './users';
import productsRouter from './products';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML files (for demonstration, use simple messages)
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

// Routers for "/users" and "/products" will be added later

// 404 Page
app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
