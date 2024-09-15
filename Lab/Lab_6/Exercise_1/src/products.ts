import { Router } from 'express';

const router = Router();

// Handle GET requests for /products
router.get('/', (req, res) => {
    res.send('<h1>Products Page</h1>');
});

// Handle POST requests for /products
router.post('/', (req, res) => {
    res.send('Product created');
});

export default router;
