import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
