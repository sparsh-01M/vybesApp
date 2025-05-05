// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import GoogleAuthPage from './components/GoogleAuthPage';
// import UserForm from './components/UserForm';
// import HomePage from './components/HomePage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<GoogleAuthPage />} />
//         <Route path="/form" element={<UserForm />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/blinks" element={<Blinks /> } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleAuthPage from './components/GoogleAuthPage';
import UserForm from './components/UserForm';
import HomePage from './components/HomePage';
import Blinks from './components/Blinks';
import Videos from './components/Videos'; // Create this component
import Profile from './components/Profile'; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAuthPage />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blinks" element={<Blinks />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
