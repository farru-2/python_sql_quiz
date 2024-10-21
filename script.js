const pythonQuestions = [
  { question: "What is the correct way to create a function in Python?", options: ["function myFunction()", "def myFunction()", "create myFunction()", "define myFunction()"], answer: 1 },
  { question: "Which of the following is used for comments in Python?", options: ["// Comment", "/* Comment */", "# Comment", "<!-- Comment -->"], answer: 2 },
  { question: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "16"], answer: 1 },
  { question: "Which of the following is a valid variable name in Python?", options: ["2name", "_name", "name!", "name-1"], answer: 1 },
  { question: "Which keyword is used to create a class in Python?", options: ["class", "Class", "def", "define"], answer: 0 },
  { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".pyt", ".py"], answer: 3 },
  { question: "How do you insert COMMENTS in Python code?", options: ["//", "#", "<!-- -->", "/* */"], answer: 1 },
  { question: "Which operator is used to multiply numbers in Python?", options: ["x", "*", "X", "%"], answer: 1 },
  { question: "Which method can be used to remove any whitespace from the beginning or the end of a string?", options: ["ptrim()", "strip()", "len()", "trim()"], answer: 1 },
  { question: "How do you start writing a while loop in Python?", options: ["while x > y:", "while (x > y)", "while x > y then:", "while (x > y):"], answer: 0 }
];

const sqlQuestions = [
  { question: "Which SQL statement is used to extract data from a database?", options: ["SELECT", "EXTRACT", "GET", "QUERY"], answer: 0 },
  { question: "Which SQL keyword is used to sort the result-set?", options: ["SORT BY", "ORDER BY", "GROUP BY", "SORT"], answer: 1 },
  { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Query Language"], answer: 0 },
  { question: "Which SQL statement is used to update data in a database?", options: ["SAVE", "UPDATE", "CHANGE", "MODIFY"], answer: 1 },
  { question: "How do you create a table in SQL?", options: ["CREATE DB", "CREATE TABLE", "ADD TABLE", "MAKE TABLE"], answer: 1 },
  { question: "What is the correct SQL syntax to delete a database?", options: ["DELETE DATABASE database_name;", "REMOVE DATABASE database_name;", "DROP DATABASE database_name;", "CLOSE DATABASE database_name;"], answer: 2 },
  { question: "Which SQL statement is used to insert new data in a database?", options: ["INSERT INTO", "ADD INTO", "ADD NEW", "INSERT NEW"], answer: 0 },
  { question: "Which SQL keyword is used to create an index on a table?", options: ["CREATE INDEX", "ADD INDEX", "INDEX", "MAKE INDEX"], answer: 0 },
  { question: "Which SQL keyword is used to retrieve unique values?", options: ["UNIQUE", "DISTINCT", "FILTER", "SEPARATE"], answer: 1 },
  { question: "What SQL clause is used to filter records?", options: ["WHERE", "HAVING", "FILTER", "LIMIT"], answer: 0 }
];

let currentQuestionIndex = 0;
let selectedQuestions = [];
let timer;
let timeLeft = 10;
let userName = "";

function startQuiz() {
  userName = document.getElementById('name').value;
  if (userName) {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('user-name').innerText = userName;
  } else {
    alert('Please enter your name.');
  }
}

function chooseQuiz(type) {
  selectedQuestions = type === 'python' ? pythonQuestions : sqlQuestions;
  document.getElementById('quiz-selection').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  clearTimeout(timer);
  timeLeft = 10;

  if (currentQuestionIndex < selectedQuestions.length) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const options = document.getElementById('options');
    options.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.innerText = `${String.fromCharCode(65 + index)}. ${option}`;
      li.onclick = () => checkAnswer(index);
      options.appendChild(li);
    });

    startTimer();
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedIndex) {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;
  const options = document.getElementById('options').children;

  if (selectedIndex === correctIndex) {
    options[selectedIndex].classList.add('correct');
  } else {
    options[selectedIndex].classList.add('incorrect');
    options[correctIndex].classList.add('correct');
  }

  currentQuestionIndex++;
  setTimeout(showQuestion, 2000);
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.innerText = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(-1); // If no answer is selected, mark as incorrect
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById('quiz-container').innerHTML = `<h2>Quiz Complete! Thanks for playing, ${userName}!</h2>`;
}
