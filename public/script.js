const question = document.getElementById('question');


function showNextQuestion() {
  fetch('./question', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => {
      question.innerText = data.question;

      for (const i in data.answers) {
        const answer = document.getElementById(`answer${Number(i) + 1}`)

        answer.innerText = data.answers[i]
      }
    })
}

showNextQuestion()