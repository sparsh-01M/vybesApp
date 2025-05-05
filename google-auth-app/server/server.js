// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// const app = express();
// const router = express.Router();
// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(bodyParser.json());
// app.use(passport.initialize());

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error(err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   googleId: String,
//   displayName: String,
//   email: String,
//   dob: Date,
//   age: Number,
//   phone: String,
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other', 'prefer-not-to-say']
//   },
//   bio: {
//     type: String,
//     maxlength: 500
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', userSchema);

// // Helper function to calculate age from DOB
// function calculateAge(birthDate) {
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
  
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
  
//   return age;
// }

// // Passport Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     console.log("Google profile:", profile);
//     let user = await User.findOne({ googleId: profile.id });
//     console.log("Found user:", user);
//     if (!user) {
//       user = new User({
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails[0].value
//       });
//       await user.save();
//       console.log("New user created:", user);
//     }
//     return done(null, user);
//   } catch (err) {
//     console.error("Error in Google auth:", err);
//     return done(err, null);
//   }
// }));

// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Add this error logging middleware
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });

// // Routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// app.get('/auth/google/callback',
//   passport.authenticate('google', { session: false }),
//   (req, res) => {
//     // Use _id instead of id
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
//     res.redirect(`${process.env.CLIENT_URL}/form?token=${token}`);
//   });

// // In the POST /api/save-details route
// app.post('/api/save-details', async (req, res) => {
//   try {
//     const { token, dob, phone, gender, bio } = req.body;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Validate required fields
//     if (!dob) {
//       return res.status(400).json({ 
//         success: false, 
//         error: "Date of birth is required" 
//       });
//     }

//     // Convert and validate date
//     const birthDate = new Date(dob);
//     if (isNaN(birthDate.getTime())) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid date format"
//       });
//     }

//     // Calculate age
//     const age = calculateAge(birthDate);

//     const user = await User.findByIdAndUpdate(
//       decoded.id,
//       { 
//         $set: { 
//           dob: birthDate,
//           age,
//           phone, 
//           gender, 
//           bio 
//         } 
//       },
//       { new: true, runValidators: true }
//     );
    
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// });
  

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  dob: Date,
  age: Number,
  phone: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  bio: {
    type: String,
    maxlength: 500
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  // publicId: {
  //   type: String,
  //   required: true
  // },
  // thumbnailUrl: {
  //   type: String,
  //   required: true
  // },
  // duration: {
  //   type: Number,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Video = mongoose.model('Video', videoSchema);

// Helper function to calculate age from DOB
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Auth middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("Google profile:", profile);
    let user = await User.findOne({ googleId: profile.id });
    console.log("Found user:", user);
    if (!user) {
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      });
      await user.save();
      console.log("New user created:", user);
    }
    return done(null, user);
  } catch (err) {
    console.error("Error in Google auth:", err);
    return done(err, null);
  }
}));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Add this error logging middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Use _id instead of id
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}/form?token=${token}`);
  });

// In the POST /api/save-details route
app.post('/api/save-details', async (req, res) => {
  try {
    const { token, dob, phone, gender, bio } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validate required fields
    if (!dob) {
      return res.status(400).json({ 
        success: false, 
        error: "Date of birth is required" 
      });
    }

    // Convert and validate date
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: "Invalid date format"
      });
    }

    // Calculate age
    const age = calculateAge(birthDate);

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { 
        $set: { 
          dob: birthDate,
          age,
          phone, 
          gender, 
          bio 
        } 
      },
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Video Routes
// POST - Create a new video entry
app.post('/api/videos', authenticateJWT, async (req, res) => {
  try {
    const { title, description, videoUrl, publicId, thumbnailUrl, duration } = req.body;
    
    // Get userId from authenticated user
    const userId = req.user.id;
    
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      // publicId,
      // thumbnailUrl,
      // duration,
      userId
    });

    const video = await newVideo.save();
    res.status(201).json(video);
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public GET - Get all videos without authentication
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Get videos by user ID
app.get('/api/videos/user', authenticateJWT, async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Get video by ID
app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE - Delete a video
app.delete('/api/videos/:id', authenticateJWT, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check if the user owns this video
    if (video.userId && video.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Video.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Video removed' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});