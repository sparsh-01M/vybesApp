// import React from 'react';
// import { AppBar, Toolbar, Typography, Box, Paper, BottomNavigation, BottomNavigationAction, Tabs, Tab } from '@mui/material';
// import { Home as HomeIcon, Person as PersonIcon, VideoLibrary as VideoIcon, FlashOn as BlinksIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import Blinks from './Blinks'; // Assuming you have a Blinks component

// // Custom styled components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #6e48aa 30%, #9d50bb 90%)',
//   boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
// }));

// const StyledTabs = styled(Tabs)(({ theme }) => ({
//   backgroundColor: '#7e57c2',
//   borderRadius: '8px 8px 0 0',
//   marginTop: '10px',
//   '& .MuiTab-root': {
//     color: 'rgba(255, 255, 255, 0.7)',
//     fontWeight: 'bold',
//   },
//   '& .Mui-selected': {
//     color: '#ffffff',
//   },
// }));

// const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #6e48aa 30%, #9d50bb 90%)',
//   position: 'fixed',
//   bottom: 0,
//   width: '100%',
//   '& .MuiBottomNavigationAction-root': {
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   '& .Mui-selected': {
//     color: '#ffffff',
//   },
// }));

// const ContentArea = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   margin: theme.spacing(2),
//   minHeight: '60vh',
//   borderRadius: '8px',
//   backgroundColor: '#f5f5f5',
// }));

// export default function HomePage() {
//   const [feedTab, setFeedTab] = React.useState(0);
//   const [navValue, setNavValue] = React.useState(0);

//   const handleTabChange = (event, newValue) => {
//     setFeedTab(newValue);
//   };

//   const handleNavChange = (event, newValue) => {
//     setNavValue(newValue);
//   };


//   return (
//     <Box sx={{ flexGrow: 1, pb: 7 }}>
//       <StyledAppBar position="static">
//         <Toolbar>
//           <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//             Vybes
//           </Typography>
//           <Typography variant="subtitle1" sx={{ mr: 2, cursor: 'pointer' }}>
//             AI Bot
//           </Typography>
//           <Typography variant="subtitle1" sx={{ cursor: 'pointer' }}>
//             AudioBooks
//           </Typography>
//         </Toolbar>
//       </StyledAppBar>

//       <StyledTabs value={feedTab} onChange={handleTabChange} centered>
//         <Tab label="Feed" />
//         <Tab label="Chall" />
//       </StyledTabs>

//       <ContentArea elevation={3}>
//         {feedTab === 0 ? (
//           <Typography variant="body1" align="center" sx={{ pt: 4 }}>
//             Feed content will be displayed here
//           </Typography>
//         ) : (
//           <Typography variant="body1" align="center" sx={{ pt: 4 }}>
//             Chall content will be displayed here
//           </Typography>
//         )}
//       </ContentArea>

//       <StyledBottomNavigation value={navValue} onChange={handleNavChange} showLabels>
//         <BottomNavigationAction label="Home" icon={<HomeIcon />} />
//         <BottomNavigationAction label="Blinks" icon={<BlinksIcon />} />
//         <BottomNavigationAction label="Videos" icon={<VideoIcon />} />
//         <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
//       </StyledBottomNavigation>
//     </Box>
//   );
// }


import React from 'react';
import { AppBar, Toolbar, Typography, Box, Paper, BottomNavigation, BottomNavigationAction, Tabs, Tab } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon, VideoLibrary as VideoIcon, FlashOn as BlinksIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6e48aa 30%, #9d50bb 90%)',
  boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: '#7e57c2',
  borderRadius: '8px 8px 0 0',
  marginTop: '10px',
  '& .MuiTab-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  '& .Mui-selected': {
    color: '#ffffff',
  },
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6e48aa 30%, #9d50bb 90%)',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  '& .MuiBottomNavigationAction-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .Mui-selected': {
    color: '#ffffff',
  },
}));

const ContentArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  minHeight: '60vh',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
}));

export default function HomePage() {
  const [feedTab, setFeedTab] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {
    setFeedTab(newValue);
  };

  const handleNavChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 7 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Vybes
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2, cursor: 'pointer' }}>
            AI Bot
          </Typography>
          <Typography variant="subtitle1" sx={{ cursor: 'pointer' }}>
            AudioBooks
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledTabs value={feedTab} onChange={handleTabChange} centered>
        <Tab label="Feed" />
        <Tab label="Chall" />
      </StyledTabs>

      <ContentArea elevation={3}>
        {feedTab === 0 ? (
          <Typography variant="body1" align="center" sx={{ pt: 4 }}>
            Feed content will be displayed here
          </Typography>
        ) : (
          <Typography variant="body1" align="center" sx={{ pt: 4 }}>
            Chall content will be displayed here
          </Typography>
        )}
      </ContentArea>

      <StyledBottomNavigation value={location.pathname} onChange={handleNavChange} showLabels>
        <BottomNavigationAction label="Home" value="/home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Blinks" value="/blinks" icon={<BlinksIcon />} />
        <BottomNavigationAction label="Videos" value="/videos" icon={<VideoIcon />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<PersonIcon />} />
      </StyledBottomNavigation>
    </Box>
  );
}

// import { useState } from 'react';
// import { 
//   AppBar,
//   Toolbar,
//   Typography,
//   Tabs,
//   Tab,
//   Container,
//   BottomNavigation,
//   BottomNavigationAction,
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton
// } from '@mui/material';
// import {
//   Home,
//   Slideshow,
//   VideoCameraBack,
//   Person,
//   Favorite,
//   ChatBubble
// } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const StyledAppBar = styled(AppBar)({
//   backgroundColor: '#6A1B9A',
//   boxShadow: 'none',
// });

// const MainContent = styled(Container)({
//   padding: '16px',
//   marginBottom: '56px',
//   height: 'calc(100vh - 128px)',
//   overflowY: 'auto',
// });

// const PostCard = styled(Card)({
//   marginBottom: '16px',
//   borderRadius: '12px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// });

// const BottomNav = styled(BottomNavigation)({
//   width: '100%',
//   position: 'fixed',
//   bottom: 0,
//   backgroundColor: '#6A1B9A',
//   color: 'white',
// });

// export default function HomePage() {
//   const [value, setValue] = useState(0);
//   const [tabValue, setTabValue] = useState(0);

//   // Dummy data for posts
//   const posts = [
//     { id: 1, username: 'user1', content: 'Check out this amazing view! 🌄', likes: 42 },
//     { id: 2, username: 'user2', content: 'New recipe experiment 👩🍳', likes: 28 },
//     { id: 3, username: 'user3', content: 'Weekend vibes 🎉', likes: 56 },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <StyledAppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Vybes
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Typography variant="body1">AI Bot</Typography>
//             <Typography variant="body1">AudioBooks</Typography>
//           </Box>
//         </Toolbar>
        
//         <Tabs 
//           value={tabValue} 
//           onChange={(e, newValue) => setTabValue(newValue)}
//           centered
//           sx={{ backgroundColor: '#F3E5F5' }}
//         >
//           <Tab label="Feed" />
//           <Tab label="Chall" />
//         </Tabs>
//       </StyledAppBar>

//       <MainContent maxWidth="sm">
//         {posts.map(post => (
//           <PostCard key={post.id}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 @{post.username}
//               </Typography>
//               <Typography variant="body1">
//                 {post.content}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <IconButton aria-label="like">
//                 <Favorite />
//               </IconButton>
//               <Typography variant="body2">{post.likes}</Typography>
//               <IconButton aria-label="comment">
//                 <ChatBubble />
//               </IconButton>
//             </CardActions>
//           </PostCard>
//         ))}
//       </MainContent>

//       <BottomNav
//         value={value}
//         onChange={(event, newValue) => setValue(newValue)}
//         showLabels
//       >
//         <BottomNavigationAction label="Home" icon={<Home />} sx={{ color: 'white' }} />
//         <BottomNavigationAction label="Blinks" icon={<Slideshow />} sx={{ color: 'white' }} />
//         <BottomNavigationAction label="Videos" icon={<VideoCameraBack />} sx={{ color: 'white' }} />
//         <BottomNavigationAction label="Profile" icon={<Person />} sx={{ color: 'white' }} />
//       </BottomNav>
//     </Box>
//   );
// }