import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { BsFillMoonStarsFill } from "react-icons/bs";
import { toggleTheme } from '@/redux/theme';
import { MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({setShowSidebar, showSidebar}) => {
const {theme} = useSelector(state=>state.theme)
const dispatch = useDispatch()
  return (
     <header className="bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md dark:border-b-[rgb(16,23,42)] shadow-b border-b-4 p-4 flex items-center justify-between md:justify-between">
        <button className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-4"><Link to='/'>BOOM</Link></h1>
        <Button onClick={()=>dispatch(toggleTheme())} variant='outline' size='icon' className='rounded-full text-black '>
            {theme === 'light' ? <BsFillMoonStarsFill /> : <MdSunny className='dark:text-white'/>}
        </Button>
      </header>
  )
}

export default Header