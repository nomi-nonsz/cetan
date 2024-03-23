import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Used for first-level sensitive routes (user security)
import ProtectedRoute from "./pages/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import Chats from "./pages/Chats"
import SendEmail from "./pages/verification/SendEmail"
import Confirmation from "./pages/verification/Confirmation"
import ResetPassword from "./pages/verification/ResetPassword"

import Contexts from "./contexts/Contexts"

import "./assets/sass/main.scss"

import Navbar from "./assets/components/nav/Navbar"
import Footer from "./assets/components/foot/Footer"

function StaticRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

function EmailRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SendEmail />} />
      <Route path="/confirm" element={<Confirmation />} />
    </Routes>
  )
}

function ForgorPasswordRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <ResetPassword.Sucess />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Contexts>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <main style={{ overflowX: "hidden" }}>
                <Navbar />
                <Routes>
                  <Route path="/*" element={<StaticRoutes />} />
                  <Route path="/signup" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/send-email/*" element={<EmailRoutes />} />
                  <Route
                    path="/resetpassword/*"
                    element={<ForgorPasswordRoutes />}
                  />
                </Routes>
              </main>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Contexts>
  )
}

export default App
