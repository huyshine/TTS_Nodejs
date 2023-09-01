import { Router } from "express";
import { signup , signin, getAllUser } from "../controller/user";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";
const router = Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user',authenticate , authorization  ,getAllUser)

export default router;