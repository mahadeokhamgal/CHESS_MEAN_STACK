import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log("incoming request");
    console.log("URL:", req.url, "params", req.params, "body", req.body);
    
    next();
};