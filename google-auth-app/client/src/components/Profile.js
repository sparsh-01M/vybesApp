// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import {
//   Home,
//   Slideshow,
//   VideoCameraBack,
//   Person,
//   Settings,
//   ExitToApp
// } from '@mui/icons-material';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// const StyledAppBar = styled(AppBar)({
//   backgroundColor: '#6A1B9A',
//   boxShadow: 'none',
// });

// export default function Profile() {
//   const navigate = useNavigate();
//   const [navValue, setNavValue] = useState(3);

//   const handleNavigation = (newValue) => {
//     setNavValue(newValue);
//     switch(newValue) {
//       case 0: navigate('/home'); break;
//       case 1: navigate('/blinks'); break;
//       case 2: navigate('/videos'); break;
//       case 3: navigate('/profile'); break;
//       default: navigate('/home');
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <StyledAppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Vybes
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Typography variant="body1">AI Bot</Typography>
//             <Typography variant="body1">AudioBooks</Typography>
//           </Box>
//         </Toolbar>
//       </StyledAppBar>

//       <Box sx={{ p: 3, marginTop: '64px', marginBottom: '56px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//           <Avatar sx={{ width: 80, height: 80, mr: 3 }} />
//           <Typography variant="h4">User Profile</Typography>
//         </Box>
        
//         <List>
//           <ListItem button>
//             <ListItemIcon><Settings /></ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon><ExitToApp /></ListItemIcon>
//             <ListItemText primary="Log Out" />
//           </ListItem>
//         </List>
//       </Box>

//       <BottomNavigation
//         value={navValue}
//         onChange={(_, newValue) => handleNavigation(newValue)}
//         showLabels
//         sx={{
//           width: '100%',
//           position: 'fixed',
//           bottom: 0,
//           backgroundColor: '#6A1B9A',
//           color: 'white',
//         }}
//       >
//         <BottomNavigationAction label="Home" icon={<Home />} />
//         <BottomNavigationAction label="Blinks" icon={<Slideshow />} />
//         <BottomNavigationAction label="Videos" icon={<VideoCameraBack />} />
//         <BottomNavigationAction label="Profile" icon={<Person />} />
//       </BottomNavigation>
//     </Box>
//   );
// }

import { LinearProgress } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home,
  Slideshow,
  VideoCameraBack,
  Person,
  Settings,
  ExitToApp,
  CloudUpload,
  Delete
} from '@mui/icons-material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import axios from 'axios';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#6A1B9A',
  boxShadow: 'none',
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Profile() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(3);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    // Fetch user videos
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get('/api/videos/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserVideos(response.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserVideos();
  }, [navigate]);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
    setVideoTitle('');
    setVideoDescription('');
    setSelectedFile(null);
    setFileName('');
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setSnackbar({
        open: true,
        message: 'Please select a video file',
        severity: 'error'
      });
      return;
    }

    if (!videoTitle.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a video title',
        severity: 'error'
      });
      return;
    }

    try {
      setUploading(true);
      
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'long videos');
      formData.append('cloud_name', 'do5w3vlu0');
      
      // Upload to Cloudinary with progress tracking
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/do5w3vlu0/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      // Create video entry in MongoDB
      const videoData = {
        title: videoTitle,
        description: videoDescription,
        videoUrl: cloudinaryResponse.data.secure_url,
        publicId: cloudinaryResponse.data.public_id,
        duration: cloudinaryResponse.data.duration,
        thumbnailUrl: cloudinaryResponse.data.secure_url.replace('/upload/', '/upload/c_thumb,w_200,h_200/'),
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Save to MongoDB with authentication
      const response = await axios.post('http://localhost:8000/api/videos', videoData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Add the new video to the user's videos
      setUserVideos([response.data, ...userVideos]);

      setSnackbar({
        open: true,
        message: 'Video uploaded successfully!',
        severity: 'success'
      });
      
      handleCloseUploadDialog();
    } catch (error) {
      console.error('Upload error:', error);
      setSnackbar({
        open: true,
        message: `Upload failed: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the deleted video from state
      setUserVideos(userVideos.filter(video => video._id !== videoId));

      setSnackbar({
        open: true,
        message: 'Video deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Delete error:', error);
      setSnackbar({
        open: true,
        message: `Failed to delete video: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }} />
          <Box>
            <Typography variant="h4">{user?.displayName || 'User Profile'}</Typography>
            {user?.email && <Typography variant="body1">{user.email}</Typography>}
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<CloudUpload />}
          onClick={handleOpenUploadDialog}
          sx={{ mb: 3, backgroundColor: '#6A1B9A' }}
        >
          Upload Video
        </Button>

        <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>My Videos</Typography>
        
        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : userVideos.length > 0 ? (
          <Grid container spacing={3}>
            {userVideos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnailUrl}
                    alt={video.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {video.description.substring(0, 100)}
                      {video.description.length > 100 ? '...' : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {formatDuration(video.duration)}
                      </Typography>
                      <Button 
                        startIcon={<Delete />} 
                        color="error" 
                        size="small"
                        onClick={() => handleDeleteVideo(video._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            You haven't uploaded any videos yet.
          </Typography>
        )}

        <List sx={{ mt: 4 }}>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Box>

      {/* Video Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={!uploading ? handleCloseUploadDialog : undefined} fullWidth maxWidth="sm">
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Upload your videos to share with the Vybes community.
          </DialogContentText>
          
          <TextField
            margin="dense"
            label="Video Title"
            fullWidth
            variant="outlined"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            disabled={uploading}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            disabled={uploading}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              disabled={uploading}
            >
              Select Video
              <VisuallyHiddenInput 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </Button>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {fileName || 'No file selected'}
            </Typography>
          </Box>
          
          {/* {uploading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              <CircularProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {uploadProgress}% uploaded
              </Typography>
            </Box>
          )} */}

{uploading && (
  <Box sx={{ width: '100%', mt: 2 }}>
    <LinearProgress 
      variant="determinate" 
      value={uploadProgress} 
      sx={{ height: 10, borderRadius: 5 }}
    />
    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
      {uploadProgress >= 100 ? 'Processing...' : `${uploadProgress}% Uploaded`}
    </Typography>
  </Box>
)}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            variant="contained" 
            disabled={uploading}
            sx={{ backgroundColor: '#6A1B9A' }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

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