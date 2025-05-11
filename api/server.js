const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// For any request that doesn't match a static file, send the index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  
  // Check if index.html exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // If index.html doesn't exist, send a fallback response
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jarral's Kitchen</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f8f4e5;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #8b5e34;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Jarral's Kitchen</h1>
          <p>Our website is currently being updated.</p>
          <p>Please check back soon!</p>
          <p>Contact us: info@jarralskitchen.com</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for serverless functions
module.exports = app;
