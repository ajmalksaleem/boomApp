import { Route, Routes } from "react-router-dom"
import Layout from "./components/auth/Layout"
import { Home, SignIn, SignUp } from "./pages"
import UploadVideos from "./pages/UploadVideos"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { CheckAuth } from "./redux/auth"
import { Skeleton } from "./components/ui/skeleton"

function App() {

 const [authChecked, setAuthChecked] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckAuth()).then(()=>{
      setAuthChecked(true)
    })
  }, [dispatch]);

  if (!authChecked) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <Routes>
      <Route path="/auth" element={<Layout/>}>
      <Route path="sign-in" element={<SignIn/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
      </Route>
      {/* <Routes element> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/add-videos" element={<UploadVideos/>}/>
      {/* </Routes> */}
    </Routes>
    
  )
}

export default App

