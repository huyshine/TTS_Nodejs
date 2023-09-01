import { create, deleteOne, getAll, getOne, update } from "../controller/blog";
import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.get("/blog", getAll);
router.get("/blog/:id", getOne);
router.post("/blog",authenticate , authorization , create);
router.put("/blog/:id",authenticate , authorization , update);
router.delete("/blog/:id",authenticate , authorization , deleteOne);

export default router;