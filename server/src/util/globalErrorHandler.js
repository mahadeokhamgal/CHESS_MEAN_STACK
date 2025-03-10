export const globalErrorHandler = (err, req, res, next) => {
    console.log("Error processing request", err);
    
    res.status(503).send("Error processing request, rech out to server team for your error!");
};