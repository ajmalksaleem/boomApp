import { Router } from "express";
import { Checkuser, logoutUser, Signin, Signup } from '../controllers/authController.js'
import {verifyToken} from '../utils/verifyToken.js'

const router = Router()

router.post('/signup', Signup)
router.post('/signin', Signin )
router.get('/check-auth', verifyToken, Checkuser)
router.post('/logout',logoutUser)

export default router