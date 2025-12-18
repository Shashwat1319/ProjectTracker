import jwt from 'jsonwebtoken';
import { userModal } from './DbModal/DbModal.js';

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ msg: "Token missing", success: false });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        // Log to confirm verification
        const user = await userModal.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
        req.user = user;
        next(); 
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token", success: false });
    }
};

export default verifyToken;
