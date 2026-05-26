import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { CRTOverlay } from './components/site/CRTOverlay.jsx'
import { TopNav } from './components/site/TopNav.jsx'
import { Footer } from './components/site/Footer.jsx'
import { Home } from './pages/Home.jsx'
import { Components } from './pages/Components.jsx'
import { Templates } from './pages/Templates.jsx'
import { Showcase } from './pages/Showcase.jsx'
import { Login } from './pages/Login.jsx'
import { LandingTemplate } from './pages/templates/LandingTemplate.jsx'
import { DashboardTemplate } from './pages/templates/DashboardTemplate.jsx'

/* reset scroll on every route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function SiteLayout({ children }) {
  return (
    <div className="tm-app">
      <TopNav />
      <main className="tm-main">{children}</main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <section className="tm-shell tm-404">
      <p className="tm-404__code">ERR 404</p>
      <h1 className="tm-404__title">SEGMENT NOT FOUND</h1>
      <p className="tm-404__msg tm-dim">
        the path you requested returned a null pointer.
      </p>
      <Link to="/" className="tm-as-btn tm-as-btn--default">
        cd ~/ — return home
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <>
      <CRTOverlay />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout>
              <Home />
            </SiteLayout>
          }
        />
        <Route path="/components" element={<Navigate to="/components/button" replace />} />
        <Route
          path="/components/:comp"
          element={
            <SiteLayout>
              <Components />
            </SiteLayout>
          }
        />
        <Route
          path="/templates"
          element={
            <SiteLayout>
              <Templates />
            </SiteLayout>
          }
        />
        <Route
          path="/showcase"
          element={
            <SiteLayout>
              <Showcase />
            </SiteLayout>
          }
        />
        <Route
          path="/login"
          element={
            <SiteLayout>
              <Login />
            </SiteLayout>
          }
        />
        <Route path="/preview/landing" element={<LandingTemplate />} />
        <Route path="/preview/dashboard" element={<DashboardTemplate />} />
        <Route
          path="*"
          element={
            <SiteLayout>
              <NotFound />
            </SiteLayout>
          }
        />
      </Routes>
    </>
  )
}
