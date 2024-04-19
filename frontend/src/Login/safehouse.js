import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const tokenHeaderKey = 'jwt-token';
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const token = req.headers[tokenHeaderKey];

    try {
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.status(200).json({ safehouseKey: 'doormat', message: 'success' });
        } else {
            //access denied
            return res.status(401).json({ message: 'error' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'error' });
    }
}