import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateVideo } from '@/redux/video';
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom';

const UploadVideos = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'short',
    videoFile: null,
    videoUrl: '',
    price: 0,
  });

  const fileInputRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, videoFile: e.target.files[0] }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const updatedData = {
    ...formData,
    videoUrl: formData.type === 'short' ? null : formData.videoUrl,
    videoFile: formData.type === 'long' ? null : formData.videoFile,
  }
   const data =  await dispatch(CreateVideo(updatedData))
   if(data?.payload?.success){
      toast('video uploaded successfully')
      navigate('/')
   }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar showSidebar={showSidebar} />
        <div className="flex-1 overflow-y-auto  flex justify-center items-center p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full mt-48 max-w-2xl border"
          >
            <h2 className="text-2xl font-bold text-center">Upload a Video</h2>

            <div>
              <Label htmlFor="title" className="block mb-1">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="description" className="block mb-1">Description</Label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-400"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="type" className="block mb-1">Video Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400  "
              >
                <option className='dark:text-black' value="short">Short-Form</option>
                <option className='dark:text-black' value="long">Long-Form</option>
              </select>
            </div>

            {formData.type === 'short' ? (
              <div>
                <Label className="block mb-2">Upload MP4 (max 10MB)</Label>
                <div
                  className="w-full border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400"
                  onClick={handleUploadClick}
                >
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload your short video</p>
                  {formData.videoFile && <p className="mt-2 text-sm text-red-600">{formData.videoFile.name}</p>}
                </div>
                <input
                  ref={fileInputRef}
                  id="videoFile"
                  type="file"
                  accept="video/mp4"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="videoUrl" className="block mb-1">Video URL (YouTube/Vimeo)</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="block mb-1">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <Button
            variant='redtheme'
              type="submit"
              className="w-full py-2 font-semibold rounded-md shadow"
            >
              Upload Video
            </Button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default UploadVideos;
