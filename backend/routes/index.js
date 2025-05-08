// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// all api routes start with /api
router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path'); // need path for file stuff
  
  // home route - send index.html
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken(); // get the token
    res.cookie("XSRF-TOKEN", csrfToken); // set cookie
    res.status(200).json({ // send back token
      'XSRF-Token': csrfToken
    });
  });
}

module.exports = router;
