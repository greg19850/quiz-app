const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/game')

const app = express();

app.listen(3000, () => {
  console.log('Server is listening at http://localost:3000/ Let\'s play a game!');
});

app.use(express.static(
  path.join(__dirname, 'public')
));

gameRoutes(app);