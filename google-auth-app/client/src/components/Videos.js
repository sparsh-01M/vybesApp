import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Box,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home,
  Slideshow,
  VideoCameraBack,
  Person,
  Shuffle
} from '@mui/icons-material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#6A1B9A',
  boxShadow: 'none',
});

const FloatingButton = styled(Fab)({
  position: 'fixed',
  bottom: 80,
  right: 20,
  backgroundColor: '#6A1B9A',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4a148c'
  }
});

export default function Videos() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(2);

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    switch(newValue) {
      case 0: navigate('/home'); break;
      case 1: navigate('/blinks'); break;
      case 2: navigate('/videos'); break;
      case 3: navigate('/profile'); break;
      default: navigate('/home');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vybes
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body1">AI Bot</Typography>
            <Typography variant="body1">AudioBooks</Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Box sx={{ p: 3, marginTop: '64px', marginBottom: '56px' }}>
        <Typography variant="h4" gutterBottom>
          Video Content
        </Typography>
        {/* Add video grid/content here */}
      </Box>

      <FloatingButton color="primary">
        <Shuffle />
      </FloatingButton>

      <BottomNavigation
        value={navValue}
        onChange={(_, newValue) => handleNavigation(newValue)}
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#6A1B9A',
          color: 'white',
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Blinks" icon={<Slideshow />} />
        <BottomNavigationAction label="Videos" icon={<VideoCameraBack />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Box>
  );
}




// import { useState, useEffect } from 'react';
// import { 
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography
// } from '@mui/material';
// import axios from 'axios'; // Add this import

// export default function Videos() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await axios.get('/api/videos');
//         setVideos(res.data);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };
//     fetchVideos();
//   }, []);

//   return (
//     <Box sx={{ p: 3, marginTop: '64px', marginBottom: '56px' }}>
//       <Typography variant="h4" gutterBottom>
//         All Videos
//       </Typography>
//       <Grid container spacing={3}>
//         {videos.map((video) => (
//           <Grid item xs={12} sm={6} md={4} key={video._id}>
//             <Card>
//               <CardMedia
//                 component="video"
//                 controls
//                 src={video.url}
//                 sx={{ height: 200 }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{video.title}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {video.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
