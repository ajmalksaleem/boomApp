import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const HomeLayout = () => {
    const {user} = useSelector(state => state.auth)
     if (!user) {
    return <Navigate to="/auth/sign-in" replace />
  }
  return (
    <><Outlet/></>
  )
}

export default HomeLayout