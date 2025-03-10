export const logger = (req, res, next) => {
    console.log("incoming request");
    console.log("URL:", req.url, "params", req.params, "body", req.body);
    
    next();
};