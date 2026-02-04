import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';

import Home from './pages/Home';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';
import './styles/App.css';

/* Navbar extracted to use useLocation */
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar ${!isHome ? "other-nav" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🎫 Park Tickets
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/book" className="nav-link">Book</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <h5>&copy; 2024 Park Ticket Booking System. All rights reserved.</h5>
            <p>Dubai Frame Experience</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
