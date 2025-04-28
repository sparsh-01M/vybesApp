// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// const app = express();

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
//     // Important fix: Use _id instead of id
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
//     res.redirect(`${process.env.CLIENT_URL}/form?token=${token}`);
//   });

// app.post('/api/save-details', async (req, res) => {
//   try {
//     const { token, age, phone, gender, bio } = req.body;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     console.log("Decoded token:", decoded);
    
//     // Add debug to find user first
//     const userBeforeUpdate = await User.findById(decoded.id);
//     console.log("User before update:", userBeforeUpdate);
    
//     if (!userBeforeUpdate) {
//       return res.status(404).json({ 
//         success: false, 
//         error: "User not found" 
//       });
//     }
    
//     const user = await User.findByIdAndUpdate(
//       decoded.id,
//       { $set: { age, phone, gender, bio } },
//       { new: true, runValidators: true }
//     );
    
//     console.log("Updated user:", user);
//     res.json({ success: true, user });
//   } catch (err) {
//     console.error("Error updating user:", err);
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
    dob: Date,  // Keep DOB field
    // Remove age field
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

  app.post('/api/save-details', async (req, res) => {
    try {
      const { token, dob, phone, gender, bio } = req.body;
      console.log("Received request body:", req.body);
      console.log("DOB received:", dob);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user
      const userBeforeUpdate = await User.findById(decoded.id);
      
      if (!userBeforeUpdate) {
        return res.status(404).json({ 
          success: false, 
          error: "User not found" 
        });
      }
      
      // Convert string date to Date object
      let birthDate = null;
      
      if (dob) {
        birthDate = new Date(dob);
        console.log("Converted birthDate:", birthDate);
        
        // Check if date is valid
        if (isNaN(birthDate.getTime())) {
          return res.status(400).json({
            success: false,
            error: "Invalid date format"
          });
        }
      }
      
      const user = await User.findByIdAndUpdate(
        decoded.id,
        { 
          $set: { 
            dob: birthDate,
            phone, 
            gender, 
            bio 
          } 
        },
        { new: true, runValidators: true }
      );
      
      console.log("Updated user:", user);
      res.json({ success: true, user });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(400).json({ success: false, error: err.message });
    }
  });

  

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});