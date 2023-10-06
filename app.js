const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use EJS as the template engine (optional)
app.set('view engine', 'ejs');
app.set('views', './views');

// Custom middleware to check working hours
app.use((req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, and so on
  const hour = now.getHours();

  // Check if it's a weekday (Monday to Friday) and time is between 9 AM and 5 PM
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('This web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
});

// Define routes for each page
app.get('/', (req, res) => {
    res.render('home'); // Render 'home.ejs' using the EJS template engine
  });
  
  app.get('/services', (req, res) => {
    res.render('services'); // Render 'services.ejs'
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact'); // Render 'contact.ejs'
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });