import express  from "express";
import {register , login, getAllUsers} from "../controllers/auth.js";

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login );
router.get('/user', getAllUsers );


export default router;