import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
