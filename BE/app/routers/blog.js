import { Router } from "express";
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/blog.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router();

router.get("/blog" , getAllBlogs )
router.get("/blog/:slug" , getBlogById)
router.post("/blog/add" , authenticate , authorization , createBlog)
router.put("/blog/update/:id", authenticate , authorization ,updateBlog )
router.delete("/blog/:id", authenticate , authorization , deleteBlog )

export default router;