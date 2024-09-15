// src/app.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Product from './product';

const app = express();

// Middleware
app.use(bodyParser.json());

// Route to create a product
app.post('/products', (req: Request, res: Response) => {
    const { id, title, price, description } = req.body;
    const newProduct = new Product(id, title, price, description);
    newProduct.save();
    res.status(201).send('Product created successfully');
});

// Route to get all products
app.get('/products', (req: Request, res: Response) => {
    res.json(Product.fetchAll());
});

// Route to get a product by ID
app.get('/products/:id', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const product = Product.findById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Route to update a product
app.put('/products/:id', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const { title, price, description } = req.body;
    const product = Product.findById(productId);
    if (product) {
        product.title = title;
        product.price = price;
        product.description = description;
        product.update();
        res.send('Product updated successfully');
    } else {
        res.status(404).send('Product not found');
    }
});

// Route to delete a product by ID
app.delete('/products/:id', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    Product.deleteById(productId);
    res.send('Product deleted successfully');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
