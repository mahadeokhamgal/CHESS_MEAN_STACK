import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
 
export const validatejwt = (req, res, next) => {
    console.log("incoming request validate jwt here");//to do
    console.log("URL:", req.url, "params", req.params, "body", req.body);
    try {
        const token = req.cookies.jwt_token;

        if (!token) {
            return res.status(403).json({ message: 'Access Denied: No Token Provided' });
        }

        jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid Token' });
            }
            if(req.url == '/users' && decoded.access != 'admin'){
                return res.status(401).json({ message: 'User is not authorised for admin end-points' })
            }
            req.user = decoded;
            next();
        })
        
    } catch(err) {
        console.log();
        res.status(500).json({ message: 'Error validating token' })
    }
};