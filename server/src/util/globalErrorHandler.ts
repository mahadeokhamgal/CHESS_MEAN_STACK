import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error processing request", err);
    
    res.status(503).send("Error processing request, rech out to server team for your error!");
};