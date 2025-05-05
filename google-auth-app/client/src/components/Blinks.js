import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

import { 
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
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

const categories = [
    { 
      name: 'Travel & Food', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/travel-food.png' 
    },
    { 
      name: 'Education & Business', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/edu-business.png' 
    },
    { 
      name: 'Sports & Fitness', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/sports-fitness.png' 
    },
    { 
      name: 'Entertainment & Media', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/entertainment-media.png' 
    },
    { 
      name: 'Gaming & Tech', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/gaming-tech.png' 
    },
    { 
      name: 'Lifestyle & Fashion', 
      icon: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/lifestyle-fashion.png' 
    }
  ];

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#6A1B9A',
  boxShadow: 'none',
});

const CategoryCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

const CategoryIcon = styled('img')({
  width: 120,
  height: 120,
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: 16,
  border: '3px solid #6A1B9A'
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

export default function Blinks() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(1);

  const handleCategoryClick = (category) => {
    navigate(`/blinks/${category.toLowerCase().replace(/ & /g, '-')}`);
  };

  const handleRandomVideo = () => {
    // Implement random video logic
    console.log('Show random video');
  };

  const handleNavigation = (newValue) => {
    setNavValue(newValue);
    switch(newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/blinks');
        break;
      case 2:
        navigate('/videos');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        navigate('/home');
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation */}
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
        
        <Tabs value={0} centered sx={{ backgroundColor: '#F3E5F5' }}>
          <Tab label="Feed" />
          <Tab label="Chall" />
        </Tabs>
      </StyledAppBar>

      {/* Main Content */}
      <Box sx={{ p: 3, marginTop: '128px', marginBottom: '56px' }}>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={6} key={index}>
              <CategoryCard onClick={() => handleCategoryClick(category.name)}>
                <CategoryIcon src={category.icon} alt={category.name} />
                <Typography variant="h6" align="center">
                  {category.name}
                </Typography>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating Action Button */}
      <FloatingButton color="primary" onClick={handleRandomVideo}>
        <Shuffle />
      </FloatingButton>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={navValue}
        onChange={(event, newValue) => handleNavigation(newValue)}
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#6A1B9A',
          color: 'white',
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<Home />} 
          sx={{ color: 'white' }} 
        />
        <BottomNavigationAction 
          label="Blinks" 
          icon={<Slideshow />} 
          sx={{ color: 'white' }} 
        />
        <BottomNavigationAction 
          label="Videos" 
          icon={<VideoCameraBack />} 
          sx={{ color: 'white' }} 
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<Person />} 
          sx={{ color: 'white' }} 
        />
      </BottomNavigation>
    </Box>
  );
}