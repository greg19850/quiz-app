const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is listening at http://localost:3000/ Let\'s play a game!');
});

let goodAnswers = 0;
let phoneAFriendUsed = false;
let askTheAudienceUsed = false;
let fiftyFiftyUsed = false;

const questions = [
  {
    question: 'What does HTML stand for?',
    answers: ['HyperText Markup Letters', 'HyperText Madeup Language', 'HyperText Mixing Language', 'HyperText Markup Language'],
    correctAnswer: 3
  },
  {
    question: 'How many bytes are in one kilobyte?',
    answers: [1024, 1000, 100, 2054],
    correctAnswer: 0
  },
  {
    question: 'Which one is not JavaScript data type?',
    answers: ['Boolean', 'Number', 'Float', 'Undefined'],
    correctAnswer: 2
  },
  {
    question: 'Which company developed JavaScript?',
    answers: ['Microsoft', 'Enron', 'Netscape', 'Cisco Systems'],
    correctAnswer: 2
  },
  {
    question: 'Node.js is a back-end runtime environment for which proramming language?',
    answers: ['C++', 'JavaScript', 'Java', 'Python'],
    correctAnswer: 1
  },
  {
    question: 'Which value in JavaScript is used to represent no value or no object?',
    answers: ['Null', 'Undefined', 'NoValue', 'NaN'],
    correctAnswer: 0
  },
]