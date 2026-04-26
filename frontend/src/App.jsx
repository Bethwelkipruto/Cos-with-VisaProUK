import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './admin/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Process from './pages/Process'
import VisaTypes from './pages/VisaTypes'
import Eligibility from './pages/Eligibility'
import Documents from './pages/Documents'
import FAQ from './pages/FAQ'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import PayPage from './pages/PayPage'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminPayments from './admin/pages/AdminPayments'
import AdminRoles from './admin/pages/AdminRoles'
import AdminAnalytics from './admin/pages/AdminAnalytics'
import AdminNotifications from './admin/pages/AdminNotifications'
import AdminSettings from './admin/pages/AdminSettings'
import AdminLogs from './admin/pages/AdminLogs'
import AdminIntegrations from './admin/pages/AdminIntegrations'
import AdminMessages from './admin/pages/AdminMessages'
import AdminApplications from './admin/pages/AdminApplications'
import AdminContent from './admin/pages/AdminContent'
import AdminMedia from './admin/pages/AdminMedia'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="process" element={<Process />} />
            <Route path="visa-types" element={<VisaTypes />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="documents" element={<Documents />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pay/:token" element={<PayPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Admin portal */}
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="integrations" element={<AdminIntegrations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
