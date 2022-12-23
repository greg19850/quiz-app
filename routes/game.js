function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
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
  ];

  app.get('/question', (req, res) => {

    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      })
    } else if (isGameOver) {
      res.json({
        looser: true,
      })
    } else {
      const nextQuestion = questions[goodAnswers]

      const { question, answers } = nextQuestion

      res.json({
        question, answers
      })
    }
  });

  app.post('/answer/:index', (req, res) => {
    const { index } = req.params;

    const question = questions[goodAnswers];
    const isCorrectAnswer = question.correctAnswer === Number(index);

    if (isCorrectAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isCorrectAnswer,
      goodAnswers,
    })
  })
};



module.exports = gameRoutes;