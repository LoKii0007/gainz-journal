import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

const Layout = () => {
  return (
    <>
      <div className="h-full w-full min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
      <BottomNav />
    </>
  )
}

export default Layout