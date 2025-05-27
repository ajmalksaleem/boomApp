import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Gift, MessageCircle, Star, Diamond, Crown, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { fetchSingle } from "@/redux/video";

const VideoPlayerDialog = ({ open, setOpen, videoId }) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { video } = useSelector((state) => state.video);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchSingle({ videoId }));
    }
  }, [videoId]);

  const isYouTube = video?.videoUrl?.includes("youtube.com") || video?.videoUrl?.includes("youtu.be");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            {video?.title || "Video Title"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading video...</div>
        ) : (
          <>
            <div className="bg-black w-full aspect-video flex items-center justify-center">
              {isYouTube ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${extractYouTubeId(video.videoUrl)}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Creator info */}
            <div className="flex items-center gap-4 p-4 border-b bg-gray-50 dark:bg-gray-800">
              <img
                src={video?.creatorId?.avatar || "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"}
                alt="Creator avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{video?.creatorId?.username || "ajmal"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{video?.creatorId?.email || "email@example.com"}</p>
              </div>
            </div>

            {/* Gifting section */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="text-yellow-500 w-5 h-5" />
                <span className="font-medium">Send a Gift</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{
                  id: "rose",
                  icon: <Heart className="w-6 h-6 text-red-500" />,
                  label: "Rose - ₹10"
                }, {
                  id: "gold",
                  icon: <Star className="w-6 h-6 text-yellow-500" />,
                  label: "Gold - ₹25"
                }, {
                  id: "silver",
                  icon: <Crown className="w-6 h-6 text-gray-500" />,
                  label: "Silver - ₹50"
                }, {
                  id: "platinum",
                  icon: <Diamond className="w-6 h-6 text-blue-500" />,
                  label: "Platinum - ₹100"
                }].map(gift => (
                  <Button
                    key={gift.id}
                    variant="outline"
                    className={clsx("flex flex-col items-center p-6 w-full", selectedGift === gift.id && "ring-2 ring-red-300")}
                    onClick={() => setSelectedGift(gift.id)}
                  >
                    {gift.icon}
                    <span className="text-sm mt-1 font-medium">{gift.label}</span>
                  </Button>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="default" className="w-full max-w-xs">Send Gift</Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Comments</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>@user123</strong>: Awesome video!</p>
                <p><strong>@maria_dev</strong>: Super helpful, thank you 🙏</p>
              </div>

              <Input placeholder="Add a comment..." className="mt-2" />
              <DialogFooter className="mt-2 flex justify-center">
                <Button type="submit" className="w-full max-w-xs">Post</Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|\.be\/|embed\/)([\w-]{11})/);
  return match ? match[1] : null;
}

export default VideoPlayerDialog;
