const question = document.getElementById('question');
const goodAnswersNumber = document.getElementById('good-answers')
const gameBoard = document.getElementById('game-board');
const h2 = document.querySelector('h2');


function showNextQuestion() {
  fetch('./question', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {

      if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'You Are a Winner!!!'
        return;
      };

      if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'You Lost :('
        return;
      };

      question.innerText = data.question;

      data.answers.forEach((answer, index) => {
        const answerBtn = document.getElementById(`answer${index + 1}`)
        answerBtn.innerText = answer
      })
    })
}

showNextQuestion();

function sendAnswer(ansIndex) {
  fetch(`./answer/${ansIndex}`, {
    method: 'POST',
  })
    .then(resp => resp.json())
    .then(data => {
      goodAnswersNumber.innerText = data.goodAnswers;
      showNextQuestion()
    })
};

const buttons = document.querySelectorAll('button');

for (const button of buttons) {

  button.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.key;

    sendAnswer(answerIndex)
  })
}