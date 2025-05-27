import { errorHandler } from "../utils/error.js";
import Video from "../models/video.model.js";
import Purchase from "../models/purchase.model.js";
import User from '../models/user.model.js'

export const createShortVideo = async (req, res, next) => {
  try {
    const { title, description, type } = req.body;
    const user = req.user;
    if (!title || !description || !type)
      return next(errorHandler(404, "all fields are required"));
    if (!req.file)
      return next(errorHandler(400, "No short video file uploaded"));
    const videoUrl = `/api/uploads/shorts/${req.file.filename}`;
    const newShortVideo = new Video({
      title,
      description,
      type,
      videoUrl,
      creatorId: user,
      isPaid: false,
    });
    await newShortVideo.save();

    res.status(201).json({
      success: true,
      message: "Short video uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createLongVideo = async (req, res, next) => {
  try {
    const { title, description, type, price, videoUrl } = req.body;
    if (!title || !description || !type || price === undefined || price === null || !videoUrl)
      return next(errorHandler(404, "all fields are required"));
    const newLongVideo = new Video({
      title,
      description,
      type,
      price,
      videoUrl,
      isPaid: price > 0 ? true : false,
      creatorId: req.user,
    });
    await newLongVideo.save();

    res.status(201).json({
      success: true,
      message: "Long video uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchVideos = async (req,res,next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    console.log(startIndex,limit)
    const userId = req.user._id
    const videos = await Video.find({ creatorId: { $ne: userId } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "creatorId",
        select: "username email",
      })
      .lean();
    const paidVideoIds = videos
      .filter((v) => v.isPaid)
      .map((v) => v._id.toString());

    const purchases = await Purchase.find({
      userId,
      videoId: { $in: paidVideoIds },
    }).select("videoId");

    const purchasedVideoIds = new Set(purchases.map(p => p.videoId.toString()));
     const videosWithStatus = videos.map(video => ({
      ...video,
       isPurchased: purchasedVideoIds.has(video._id.toString())
    }));
res.status(200).json({
  success : true,
  data : videosWithStatus
})
  } catch (error) {
    next(error);
  }
};

export const purchaseVideo = async (req, res, next) => {
  try {
    const userId = req.user._id; 
    const { videoId } = req.params;
    const pricePaid = Number(req.body.pricePaid); 

    const foundUser = await User.findById(userId);
    if (!foundUser) return next(errorHandler(404, "User not found"));

    if (foundUser.walletBalance < pricePaid) {
      return next(errorHandler(400, "Insufficient wallet balance"));
    }

    // Prevent duplicate purchases
    const alreadyPurchased = await Purchase.findOne({ userId, videoId });
    if (alreadyPurchased) {
      return next(errorHandler(409, "You already purchased this video"));
    }

    // Save purchase
    const newPurchase = new Purchase({
      userId,
      videoId,
      pricePaid,
    });
    await newPurchase.save();

    // Update wallet
    foundUser.walletBalance -= pricePaid;
    await foundUser.save();

    res.status(201).json({
      message: "Video purchased successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};


export const videoDetails = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const foundVideo = await Video.findById(videoId);
    if (!foundVideo) return next(errorHandler(400, 'Video not found'));

    if (foundVideo.isPaid) {
      const verifyPurchase = await Purchase.findOne({ videoId, userId });
      if (!verifyPurchase) {
        return next(errorHandler(403, 'You are not allowed to watch this video'));
      }
    }

    const populatedVideo = await foundVideo.populate({
      path: 'creatorId',
      select: 'username email walletBalance'
    });

    res.status(200).json({
      success: true,
      data: {
        ...populatedVideo.toObject()
      }
    });
  } catch (error) {
    next(error);
  }
};
