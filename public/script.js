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

showNextQuestion()