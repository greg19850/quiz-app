const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is listening at http://localost:3000/ Let\'s play a game!');
});