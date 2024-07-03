
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
    return (
        <div>
            <Header />
           <div className='p-10'></div>
                <Outlet />
           
            <Footer />
        </div>
    )
}

export default Layout