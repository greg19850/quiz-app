const question = document.getElementById('question');


function showNextQuestion() {
  fetch('./question', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {
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
    .then(data => console.log(data))
};

const buttons = document.querySelectorAll('button');

for (const button of buttons) {

  button.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.key;

    sendAnswer(answerIndex)
  })
}