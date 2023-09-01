import { Router } from "express";
import { getAll, getCmtbyBlog, createCmt, deleteCmt } from "../controller/comment";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.get("/comment",getAll);
router.get("/comment/byBlog/:id", getCmtbyBlog );
router.post("/comment",authenticate , authorization , createCmt);
router.delete("/comment/:id",authenticate , authorization , deleteCmt);

export default router;