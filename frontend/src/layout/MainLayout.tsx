import NavbarMenu from './NavbarMenu'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <NavbarMenu />
      <div className='page-content'>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout