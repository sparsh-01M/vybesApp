import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleAuthPage from './components/GoogleAuthPage';
import UserForm from './components/UserForm';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAuthPage />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;