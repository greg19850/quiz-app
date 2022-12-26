const question = document.getElementById('question');
const goodAnswersNumber = document.getElementById('good-answers')
const gameBoard = document.getElementById('game-board');
const h2 = document.querySelector('h2');
const hintDisplay = document.getElementById('hint');
const buttons = document.querySelectorAll('.answer-btn');

for (const button of buttons) {

  button.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.key;

    sendAnswer(answerIndex)
  })
};


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
      hintDisplay.innerText = '';

      data.answers.forEach((answer, index) => {
        const answerBtn = document.getElementById(`answer${index + 1}`);
        answerBtn.style.display = 'inline-block'
        answerBtn.innerText = answer
      })
    })
}

showNextQuestion();

function sendAnswer(ansIndex) {
  fetch(`/answer/${ansIndex}`, {
    method: 'POST',
  })
    .then(resp => resp.json())
    .then(data => {
      goodAnswersNumber.innerText = data.goodAnswers;
      showNextQuestion()
    })
};


function phoneAFriend() {
  fetch('/help/friend', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {
      hintDisplay.textContent = data.text
    })
};

document.getElementById('phoneAFriend').addEventListener('click', phoneAFriend);

function handleFiftyFiftyLifeline(data) {

  if (typeof data.text === 'string') {
    hintDisplay.textContent = data.text
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.style.display = 'none'
      }
    }
  }
}

function fiftyFifty() {
  fetch('/help/fifty', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {
      hintDisplay.innerText = '';
      handleFiftyFiftyLifeline(data)
    })
};

document.getElementById('fiftyFifty').addEventListener('click', fiftyFifty);

function handleAudienceAnswer(data) {

  if (typeof data.text === 'string') {
    hintDisplay.innerText = data.text;
  } else {
    data.chart.forEach((percent, index) => {

      buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`;
    });
  }
}

function askTheAudience() {
  fetch('/help/audience', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {
      hintDisplay.innerText = '';
      handleAudienceAnswer(data);
    });
}

document.getElementById('askTheAudience').addEventListener('click', askTheAudience);