export const validatejwt = (req, res, next) => {
    console.log("incoming request validate jwt here");//to do
    console.log("URL:", req.url, "params", req.params, "body", req.body);
    
    next();
};