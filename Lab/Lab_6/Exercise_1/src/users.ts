import { Router } from 'express';

const router = Router();

// Handle GET requests for /users
router.get('/', (req, res) => {
    res.send('<h1>Users Page</h1>');
});

// Handle POST requests for /users
router.post('/', (req, res) => {
    res.send('User created');
});

export default router;
