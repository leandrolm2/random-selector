import dotenv from 'dotenv';

dotenv.config();

const SERVER_TOKEN_EXPIRE = process.env.SERVER_PORT || 3600;
const SERVER_TOKEN_SECRET = process.env.SERVER_PORT || 'coolIssuer';
const SERVER_TOKEN_ISSUER = process.env.SERVER_PORT || 'superencryptedsecret';

const TOKEN = {
    expireTime: SERVER_TOKEN_EXPIRE,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
}

const config = {
    token: TOKEN
}

export default config
