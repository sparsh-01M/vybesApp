// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   TextField, 
//   Button, 
//   Container, 
//   Typography, 
//   Box, 
//   FormControl, 
//   InputLabel, 
//   Select, 
//   MenuItem 
// } from '@mui/material';
// import axios from 'axios';

// export default function UserForm() {
//   const [age, setAge] = useState('');
//   const [phone, setPhone] = useState('');
//   const [gender, setGender] = useState('');
//   const [bio, setBio] = useState('');
//   const navigate = useNavigate();
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     // Get token from URL if present
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlToken = urlParams.get('token');
    
//     if (urlToken) {
//       localStorage.setItem('token', urlToken);
//       setToken(urlToken);
//       // Clean the URL
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/save-details', {
//         token,
//         age,
//         phone,
//         gender,
//         bio
//       });
//       navigate('/home');
//     } catch (err) {
//       alert('Error saving details: ' + err.response?.data?.error || err.message);
//     }
//   };

//   if (!token) {
//     return (
//       <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
//         <Typography variant="h6" color="error">
//           No authentication token found. Please sign in first.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Complete Your Profile
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Age"
//             type="number"
//             fullWidth
//             margin="normal"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//             inputProps={{ min: 1 }}
//           />
          
//           <TextField
//             label="Phone Number"
//             type="tel"
//             fullWidth
//             margin="normal"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
          
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Gender</InputLabel>
//             <Select
//               value={gender}
//               label="Gender"
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <MenuItem value="male">Male</MenuItem>
//               <MenuItem value="female">Female</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//               <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
//             </Select>
//           </FormControl>
          
//           <TextField
//             label="Bio"
//             multiline
//             rows={4}
//             fullWidth
//             margin="normal"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Tell us something about yourself..."
//           />
          
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3 }}
//           >
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import axios from 'axios';

export default function UserForm() {
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Get token from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      setToken(urlToken);
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Inside UserForm.js handleSubmit function
// In UserForm.js handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:8000/api/save-details', {
      token,
      dob,  // This stays the same
      phone,
      gender,
      bio
    });
    navigate('/home');
  } catch (err) {
    alert('Error saving details: ' + err.response?.data?.error || err.message);
  }
};

  if (!token) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">
          No authentication token found. Please sign in first.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Complete Your Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          
          <TextField
            label="Phone Number"
            type="tel"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Bio"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself..."
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}