import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const {name, rank, email, password} = req.body;
    console.log("name, rank, email, password", name, rank, email, password);
    
    res.send('Hello, TypeScript and Express!');
});

module.exports = router;