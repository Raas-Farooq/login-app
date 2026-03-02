import { useState } from 'react'
import './App.css'
import Home from './components/home.tsx'
import Navbar from './components/navbar.tsx'
import Footer from './components/footer.tsx'
import LoginPage from './components/loginPage.tsx'
import SignupPage from './components/signupPage.tsx'
import Dashboard from './components/dashboard.tsx'
import About from './components/about.tsx'
import Contact from './components/contact.tsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Navbar onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer />
    </>
  )
}

export default App
