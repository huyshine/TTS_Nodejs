import Comment from "../model/comment";

export const getAll = async (req: any, res: any) => {
    try {
        const data = await Comment.getAll();
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

export const getCmtbyBlog = async (req: any, res: any) => {
    try {
        const data = await Comment.getCmtbyBlog(req.params.id);
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

export const createCmt = async (req: any, res: any) => {
    try {

        const data = await Comment.createCmt(req.body);
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

export const deleteCmt = async (req: any, res: any) => {
    try {
        const data = await Comment.deleteCmt(req.params.id);
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}