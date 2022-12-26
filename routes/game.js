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
        loser: true,
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

    if (isGameOver) {
      res.json({
        loser: true,
      })
    }

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


  app.get('/help/friend', (req, res) => {

    if (phoneAFriendUsed) {
      return res.json({
        text: 'You have already used this lifeline'
      })
    }

    phoneAFriendUsed = true;

    const friendKnowsAnswer = Math.random() < 0.5;

    const question = questions[goodAnswers];

    res.json({
      text: friendKnowsAnswer ? `I think answer is ${question.answers[question.correctAnswer]}` : 'Sorry, but I don\'t know the answer'
    })
  });

  app.get('/help/fifty', (req, res) => {

    if (fiftyFiftyUsed) {
      return res.json({
        text: 'You have already used this lifeline'
      })
    }

    fiftyFiftyUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter((answer, index) => (
      index !== question.correctAnswer
    ));

    answersCopy.splice(Math.floor(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy,
    })
  });


  app.get('/help/audience', (req, res) => {

    if (askTheAudienceUsed) {
      return res.json({
        text: 'You have already used this lifeline',
      });
    }

    askTheAudienceUsed = true;

    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);

      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart,
    });

  });
};


module.exports = gameRoutes;