
export const authorization = (req, res, next) => {
    try {
        const { user } = req;
        if(user.role !== "admin") {
            return res.status(403).json({status: "error", message: "Bạn không có quyền truy cập"})
        }
        next();
        
    } catch (error) {
        res.status(500).json({status: "error", message: error.message})
    }
}