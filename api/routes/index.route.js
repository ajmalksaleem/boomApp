import {Router} from 'express'
import AuthRoutes from './user.routes.js'
import VideoRoutes from './video.routes.js'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/video', VideoRoutes)

export default router