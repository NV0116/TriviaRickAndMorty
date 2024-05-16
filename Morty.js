fetch('https://rickandmortyapi.com/api/character/329')
  .then(response => response.json())
  .then(data => {
    const logoUrl = data.image;
    document.getElementById('logo').src = logoUrl;
  })
  .catch(error => console.error('Error al obtener el logo:', error));


const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score-value');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

const questions = [
  {
    question: '¿Cómo se llama el nieto de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    options: ['Morty', 'Jerry', 'Beth', 'Summer'],
    correctAnswer: 'Morty'
  },
  {
    question: '¿Cuál es el lema de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Wubba Lubba Dub Dub', '¡Y eso es lo que pasa en las noticias!', '¡A bailar!', '¡Pickle Rick!'],
    correctAnswer: 'Wubba Lubba Dub Dub'
  },
  {
    question: '¿Cuál es el nombre completo de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Rick Sanchez', 'Rick C-137', 'Rick Smith', 'Rick Grimes'],
    correctAnswer: 'Rick Sanchez'
  },
  {
    question: '¿Qué tipo de criatura es Snowball?',
    image: 'https://rickandmortyapi.com/api/character/avatar/329.jpeg',
    options: ['Perro', 'Gato', 'Hámster', 'Oso'],
    correctAnswer: 'Perro'
  },
  {
    question: '¿Qué objeto esencial necesitan Rick y Morty para viajar entre dimensiones?',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    options: ['Portal gun', 'Plumbus', 'Meeseeks box', 'Mr. Meeseeks'],
    correctAnswer: 'Portal gun'
  },
  {
    question: '¿Cuál es la atracción favorita de Rick en el Anatomy Park?',
    image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
    options: ['Las Cascadas Vejiga', 'El higado Embrujado', 'Piratas del Pancreas', 'La Montaña Bazo'],
    correctAnswer: 'Piratas del Pancreas'
  },
  {
    question: '¿Cómo se llama el parásito alienígena con el que Rick tuvo una relación en el pasado?',
    image: 'https://rickandmortyapi.com/api/character/avatar/372.jpeg',
    options: ['Melissa', 'Eternity', 'Blue', 'Unity'],
    correctAnswer: 'Unity'
  },
  {
    question: '¿Qué significa la frase "Wubba lubba dub dub"?',
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    options: ['Estoy Sufriendo, Por Favor Ayudame', 'Que Comienze La Fiesta!!!', 'Zaska', 'Creo que Te Equivocas'],
    correctAnswer: 'Estoy Sufriendo, Por Favor Ayudame'
  },
  {
    question: '¿Cuál era el nombre de esclavo del perro de Morty?',
    image: 'https://rickandmortyapi.com/api/character/avatar/329.jpeg',
    options: ['Sparky', 'Whiskers', 'Snuffles', 'Squanchy'],
    correctAnswer: 'Snuffles'
  },
  {
    question: '¿Cuál es el verdadero nombre de Birdperson?',
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    options: ['Phoenixperson', 'Owlperson', 'Eagleperson', 'Hawkperson'],
    correctAnswer: 'Phoenixperson'
  },
  {
    question: '¿Cómo se llama el planeta natal de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Tierra', 'Gallifrey', 'Planeta Squanch', 'Planeta Desconocido'],
    correctAnswer: 'Planeta Desconocido'
  },
  {
    question: '¿Quién es el mejor amigo de Morty?',
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    options: ['Birdperson', 'Jerry', 'Mr. Poopybutthole', 'Squanchy'],
    correctAnswer: 'Birdperson'
  },
  {
    question: '¿Cuál es el programa de televisión favorito de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Interdimensional Cable', 'Game of Thrones', 'Breaking Bad', 'The Simpsons'],
    correctAnswer: 'Interdimensional Cable'
  },
  {
    question: '¿Qué criatura rapta a Jerry en la primera temporada?',
    image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
    options: ['Cronenberg', 'Gromflomite', 'Meeseeks', 'Scary Terry'],
    correctAnswer: 'Gromflomite'
  },
  {
    question: '¿Cómo se llama el planeta donde vive Unity?',
    image: 'https://rickandmortyapi.com/api/character/avatar/372.jpeg',
    options: ['Beta-7', 'D-74', 'C-137', 'Froopyland'],
    correctAnswer: 'Beta-7'
  },
  {
    question: '¿Qué es Tiny Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/353.jpeg',
    options: ['Un niño', 'Un robot', 'Una versión joven de Rick', 'Una canción'],
    correctAnswer: 'Una versión joven de Rick'
  },
  {
    question: '¿Qué es Anatomy Park?',
    image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg',
    options: ['Un parque de diversiones', 'Un parque de diversiones dentro de un cuerpo humano', 'Un parque zoológico', 'Una clínica médica'],
    correctAnswer: 'Un parque de diversiones dentro de un cuerpo humano'
  },
  {
    question: '¿Quién es el padre biológico de Beth?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Rick', 'Jerry', 'Birdperson', 'Squanchy'],
    correctAnswer: 'Rick'
  },
  {
    question: '¿Qué animal es el presidente de la Federación Galáctica?',
    image: 'https://rickandmortyapi.com/api/character/avatar/343.jpeg',
    options: ['Perro', 'Gato', 'Pájaro', 'Ornitorrinco'],
    correctAnswer: 'Ornitorrinco'
  },
  {
    question: '¿Quién es Birdperson para Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    options: ['Amigo', 'Hermano', 'Padre', 'Tío'],
    correctAnswer: 'Amigo'
  },
  {
    question: '¿Cuál es la bebida favorita de Rick?',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    options: ['Cerveza', 'Whisky', 'Vodka', 'Tequila'],
    correctAnswer: 'Whisky'
  },
];

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
}

function shuffleQuestionsAndOptions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  questions.forEach(question => {
    shuffleOptions(question.options);
  });
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  document.getElementById('question-image').src = question.image;
  optionsContainer.innerHTML = '';

  const shuffledOptions = [...question.options];
  shuffleOptions(shuffledOptions);

  shuffledOptions.forEach(option => {
    const optionElement = document.createElement('button');
    optionElement.classList.add('list-group-item', 'list-group-item-action');
    optionElement.innerText = option;
    optionElement.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
    optionsContainer.appendChild(optionElement);
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score += 5; 
    correctAnswers++;
  } else {
    score -= 3; 
    event.target.classList.add('list-group-item-danger');
    incorrectAnswers++;
  }
  scoreElement.innerText = score; 
  const options = optionsContainer.children;
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add('disabled');
    if (options[i].innerText === correctAnswer) {
      options[i].classList.add('active');
    }
  }
  nextButton.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    let message = '';
    if (score >= 90) {
      message = 'Asombroso, sabes mucho de Rick And Morty';
    } else if (score >= 60) {
      message = 'Grrr, sabes algo de Rick And Morty';
    } else {
      message = 'Sabes muy poco de Rick And Morty =(';
    }
    alert(`Quiz completado!\nRespuestas correctas: ${correctAnswers}\nRespuestas incorrectas: ${incorrectAnswers}\nPuntuación final: ${score}\n${message}`);
  }
}

nextButton.addEventListener('click', nextQuestion);

shuffleQuestionsAndOptions();
showQuestion(questions[currentQuestionIndex]);

document.getElementById('reset-btn').addEventListener('click', resetQuiz);

function resetQuiz() {
currentQuestionIndex = 0;
score = 0;
correctAnswers = 0;
incorrectAnswers = 0;
shuffleQuestionsAndOptions();
showQuestion(questions[currentQuestionIndex]);
scoreElement.innerText = score;
}


