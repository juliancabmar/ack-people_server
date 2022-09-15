const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
    // constext = { ... headers }
    const authHeader = context.req.headers.authorization;
    
    if (authHeader) {
        //Berarer ....
        const token = authHeader.split("Bearer ")[1];
        
        if (token) {
            try {
            const user = jwt.verify(token, SECRET_KEY);
            
            return user
            } catch (err) {
                throw new AuthenticationError('Invalid / Expired Token');
            }
        }
        throw new Error('Authentication Token must be \'Bearer <Token>\'');
    }
    throw new Error('Authorization Header must be provided');
}