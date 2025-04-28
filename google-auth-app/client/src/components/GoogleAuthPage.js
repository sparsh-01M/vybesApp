import { Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function GoogleAuthPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Sign Up with Google
      </Typography>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        style={{ backgroundColor: '#4285F4', color: 'white' }}
      >
        Continue with Google
      </Button>
    </Container>
  );
}