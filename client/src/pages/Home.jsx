import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/video";
import { FaPlay } from "react-icons/fa";
import PurchaseDialog from "@/components/PurchaseDialog";
import VideoPlayerDialog from "@/components/VideoPlayerDialog";

export default function MainFeedPage() {
  const dispatch = useDispatch();
  const { videoContent } = useSelector((state) => state.video);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playingDialogOpen, setPlayingDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos({ startIndex: 0, limit: 5 })).catch((error) => {
      console.error("Error fetching videos:", error);
    });
  }, []);

  const handleLoadmore = async () => {
    dispatch(fetchVideos({ startIndex: videoContent?.length, limit: 5 })).catch(
      (error) => {
        console.error("Error fetching videos:", error);
      }
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (video.tagName === "VIDEO") {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const shortVideos = document.querySelectorAll('video[data-short="true"]');
    shortVideos.forEach((video) => observer.observe(video));

    return () => {
      shortVideos.forEach((video) => observer.unobserve(video));
    };
  }, [videoContent]);

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:v=|\.be\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex h-screen flex-col">
      <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar showSidebar={showSidebar} />
        <main className="flex-1 overflow-y-auto p-4 space-y-6">
          {videoContent.map((video) => (
            <Card
              key={video._id}
              className="shadow rounded-2xl overflow-hidden dark:bg-gray-800 bg-gray-100 max-w-xl mx-auto transition-transform hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"
                    alt={video.creatorId.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {video.creatorId.username}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold mb-2">{video.title}</p>
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  {video.type === "short" ? (
                    <>
                      <video
                        data-short="true"
                        src={video.videoUrl}
                        className="w-full h-full object-contain"
                        muted
                        loop
                        playsInline
                        controls={false}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 dark:bg-white/30 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
                       
                        <p className="text-white dark:text-black font-bold text-xl">
                          {" "}
                          <Button variant='redtheme' onClick={() => {
                                setPlayingVideo(video?._id);
                                setPlayingDialogOpen(true);
                              }}> <FaPlay className="text-white" />View Video</Button>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${extractYouTubeId(
                          video.videoUrl
                        )}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      {!video.isPurchased && video.isPaid ? (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                          <p className="text-white sm:font-medium sm:text-lg text-sm">
                            This video is paid, <br />
                            Buy it using your wallet balance
                          </p>
                          <Button
                            variant="redtheme"
                            className="text-white text-lg font-bold"
                            onClick={() => {
                              setSelectedVideo(video);
                              setDialogOpen(true);
                            }}
                          >
                            Buy ₹{video.price}
                          </Button>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
                          <p className="text-white font-bold text-xl">
                            <Button
                              variant="redtheme"
                              onClick={() => {
                                setPlayingVideo(video?._id);
                                setPlayingDialogOpen(true);
                              }}
                            >
                              <FaPlay className="text-white " />
                              Watch Video
                            </Button>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {selectedVideo && (
            <PurchaseDialog
              open={dialogOpen}
              setOpen={setDialogOpen}
              videoId={selectedVideo._id}
              videoTitle={selectedVideo.title}
              videoPrice={selectedVideo?.price}
            />
          )}
          {playingVideo && (
            <VideoPlayerDialog
              open={playingDialogOpen}
              setOpen={setPlayingDialogOpen}
              videoId={playingVideo}
            />
          )}

          <div className="flex justify-center items-center">
            <Button onClick={handleLoadmore} variant="outline">
              Load More
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
