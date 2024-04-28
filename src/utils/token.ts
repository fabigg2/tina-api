import jwt from 'jsonwebtoken'
/**
 * Generates token
 * @param user 
 * @returns 
 */
 const genToken = (user) => {
    const secret = process.env.SECRET_WORD_JWT;
    return jwt.sign(user, secret, { expiresIn: 60 * 60 });
}

/**
 * Vefifies if a token is valid or hasn't caducated
 * @param token 
 * @returns 
 */
const verifyToken = (token) => {
    const secret = process.env.SECRET_WORD_JWT;
    return jwt.verify(token, secret);
}

export  {genToken, verifyToken}