import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}>
        This is your empty home page. Add content here later.
      </Typography>
    </Container>
  );
}