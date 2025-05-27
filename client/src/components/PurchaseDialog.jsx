import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; 
import { Button } from "./ui/button";
import { Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, PurchaseVideo, resetVideos } from "@/redux/video";

const PurchaseDialog = ({videoId, open, setOpen, videoTitle, videoPrice}) => {
    const{user} = useSelector(state=>state.auth)
    const { videoContent } = useSelector((state) => state.video);
    const dispatch = useDispatch()

const handlePurchase = async () => {
  const data = await dispatch(PurchaseVideo({videoId, videoPrice}));
  if (data?.payload?.success) {
    const length = videoContent?.length+1
    dispatch(resetVideos()); 
dispatch(fetchVideos({ startIndex: 0, limit:length }))
    setOpen(false)
  }else{
    setOpen(false)
  }
};


  return (
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:w-md w-sm rounded-2xl shadow-lg animate-in fade-in zoom-in duration-200">
        <DialogHeader className="flex items-center gap-3 text-red-600">
          <AlertCircle className="w-10 h-10" />
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Confirm Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
          <p className="text-base">
            Are you sure you want to purchase <strong className="text-black dark:text-white">{videoTitle}</strong>?
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Wallet className="w-5 h-5" />
            Wallet Balance: {user?.walletBalance}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="redtheme"
            className=" flex items-center gap-2"
            onClick={handlePurchase}
          >
            <CheckCircle className="w-4 h-4" />
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseDialog




