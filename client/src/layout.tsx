import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import styles from './layout.module.css'

const Layout = () => {
  const location = useLocation()
  console.log(location.pathname)
  const showHeader = location.pathname !== '/login' && location.pathname !== '/signup'
  return (
    <div className={styles.layout}>
      {showHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {showHeader && <Footer />}
    </div>
  )
}

export default Layout
