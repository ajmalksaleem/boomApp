import { Router } from "express";
import { Checkuser, Signin, Signup } from '../controllers/authController.js'
import {verifyToken} from '../utils/verifyToken.js'

const router = Router()

router.post('/signup', Signup)
router.post('/signin', Signin )
router.get('/check-auth', verifyToken, Checkuser)

export default router