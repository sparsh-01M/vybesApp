// import { Button, Container, Typography } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';

// export default function GoogleAuthPage() {
//   const handleGoogleLogin = () => {
//     window.location.href = 'http://localhost:8000/auth/google';
//   };

//   return (
//     <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
//       <Typography variant="h4" gutterBottom>
//         Sign Up with Google
//       </Typography>
//       <Button
//         variant="contained"
//         startIcon={<GoogleIcon />}
//         onClick={handleGoogleLogin}
//         style={{ backgroundColor: '#4285F4', color: 'white' }}
//       >
//         Continue with Google
//       </Button>
//     </Container>
//   );
// }

import { Button, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useEffect } from 'react';

const images = [
  'https://res.cloudinary.com/do5w3vlu0/image/upload/v1743101306/cld-sample.jpg',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80',
  'https://res.cloudinary.com/do5w3vlu0/image/upload/v1743101303/samples/balloons.jpg',
  'https://res.cloudinary.com/do5w3vlu0/image/upload/v1743454352/img-vXxzucrPdgwm9Wg98QNMa_ikirh4.jpg'
];

export default function GoogleAuthPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`Background ${index + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: activeIndex === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: 0
          }}
        />
      ))}
      
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            transition: 'transform 0.7s',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Typography 
            variant="h2" 
            component="h2"
            sx={{
              color: 'common.white',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Vybes
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: '#cd040b',
              color: 'white',
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#a00309'
              },
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}
          >
            Google Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}