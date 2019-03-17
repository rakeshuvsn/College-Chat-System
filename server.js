const express = require('express');
const app = express();
const path = require('path');

// Run the app by serving the static files
// in the dist directory

const port = process.env.PORT || 8080;

const routes = [
  '/login',
  '/signup',
  '/admin/*',
  '/chat/!*',
  '/profile'
];

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/College-E-Talk/index.html'));
});

routes.forEach(function (route) {
  app.get(route, function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/College-E-Talk/index.html'));
  });
});

app.use(express.static(path.join(__dirname, '/dist')));
// Start the app by listening on the default
// Heroku port
app.listen(port, function() {
  console.log('server started on port' + port);
});
