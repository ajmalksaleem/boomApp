import { Router } from "express";
import { createShortVideo, createLongVideo, fetchVideos, purchaseVideo, videoDetails } from "../controllers/videoController.js";
import upload from "../utils/multer.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = Router()

router.post('/createshort',verifyToken, upload.single('videoFile'), createShortVideo)
router.post('/createlong',verifyToken, createLongVideo)

router.get('/fetch', verifyToken, fetchVideos)

router.post('/purchase/:videoId', verifyToken, purchaseVideo)

router.get('/details/:videoId', verifyToken, videoDetails)

export default router