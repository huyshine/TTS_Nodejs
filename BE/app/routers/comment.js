import { Router } from "express";
import { createComment,
         deleteComment,
        getAllComments, 
        getCommentByBlog ,
        trashComment,
        restoreComment,
        featuresComment
    } from "../controllers/comment.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router();

router.get("/comment" , getAllComments)
router.get("/comment/byBlog/:id" , getCommentByBlog)
router.post("/comment/add" ,createComment )
router.delete("/comment/:id", authenticate , authorization , deleteComment)
router.get("/comment/trash", authenticate , authorization , trashComment)
router.patch("/comment/restore/:id", authenticate , authorization , restoreComment)
router.delete("/comment/features/:id", authenticate , authorization , featuresComment)

export default router;