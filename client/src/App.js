
import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Landing from './components/landing'
import LoginForm from './components/auth/LoginForm'
import RegiterForm from './components//auth/RegiterForm'

function App() {
  return (
  // <Router>
  //   <Routes>
  //     <Route exact path="/" component={Landing} />
  //     <Route exact path="/login" component={LoginForm} />
  //     <Route exact path="/" component={RegiterForm} />
  //   </Routes>
  // </Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<LoginForm />} />
        <Route path="/contact" element={<RegiterForm />} />
      </Routes>
  )
}
export default App;
