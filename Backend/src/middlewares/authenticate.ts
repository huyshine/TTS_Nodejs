import jwt from 'jsonwebtoken';
import User from '../model/user';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
            
            const token = authHeader && authHeader.split(" ")[1] ;
            const { id } = jwt.verify(token, process.env.SECRET_KEY)

            const user = await User.getDetailUser(id) ;
            if (!user) {
                throw new Error("Không tìm thấy người dùng");
            }
            req.user = user
            next(); 
        } catch (error) {
                return res.status(500).json({status: "error", message: error.message})
        }
}   