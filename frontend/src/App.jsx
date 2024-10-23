import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import necessary components
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import Form from './pages/Form';
import ThankYou from './pages/ThankYou';

import './transitions.css';

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Use location.key for unique key
        classNames="fade" // Specify the class names for CSS transitions
        timeout={300} // Duration of the transition
      >
        {/* Routes are wrapped here to apply transitions */}
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

// Wrap the App component with Router in a separate component
const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
