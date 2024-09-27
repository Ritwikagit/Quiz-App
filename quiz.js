const quesJSON = [
  {
    correctAnswer: 'Three ',
    options: ['Two', 'Three ', 'Four', 'Five'],
    question:
      "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: 'L. Frank Baum',
    options: [
      'Suzanne Collins',
      'James Fenimore Cooper',
      'L. Frank Baum',
      'Donna Leon',
    ],
    question:
      "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: 'Atlanta United',
    options: [
      'Atlanta United',
      'Atlanta Impact',
      'Atlanta Bulls',
      'Atlanta Stars',
    ],
    question:
      'Which of these is a soccer team based in Atlanta?',
  },
  {
    correctAnswer: 'A Nanny',
    options: [
      'A Sow',
      'A Lioness',
      'A Hen',
      'A Nanny',
    ],
    question: 'A female goat is known as what?',
  },
  {
    correctAnswer: 'P. L. Travers',
    options: [
      'J. R. R. Tolkien',
      'P. L. Travers',
      'Lewis Carroll',
      'Enid Blyton',
    ],
    question:
      "Which author wrote 'Mary Poppins'?",
  },
];
   

let score = 0;
let currentQuestion = 0;
const totalScore = quesJSON.length;
let answerSelected = false; // Flag to track if an answer was selected
let selectedButton = null; // Variable to keep track of the selected button

// Accessing all the elements:
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById('next');

showQuestion();

nextEl.addEventListener('click', () => {
  if (answerSelected) {
    nextQuestion();
    answerSelected = false; // Reset the flag for the next question
    selectedButton = null; // Reset the selected button for the next question
  } else {
    alert("Please select an answer before proceeding!");
  }
});

function showQuestion() {
  // Destructuring the object
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  // Setting question text content
  questionEl.textContent = question;

  const shuffledOptions = shuffleOptions(options);

  // Populating the Options div with the buttons.
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    optionEl.appendChild(btn);

    // Event handling on the button:
    btn.addEventListener("click", () => {
      if (selectedButton) {
        selectedButton.classList.remove('selected'); // Remove the selected style from the previously selected button
        selectedButton.classList.remove('wrong');    // Remove wrong style if present
      }
      
      btn.classList.add('selected'); // Add the selected style to the clicked button
      selectedButton = btn; // Update the selected button reference

      answerSelected = true; // Set the flag to true when an answer is selected

      if (opt === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
        btn.classList.add('wrong'); // Highlight the wrong answer
      }
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      
      // Disable all buttons after selecting an answer
      const allButtons = optionEl.querySelectorAll('button');
      allButtons.forEach(button => button.disabled = true);

      // Highlight the correct answer
      allButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
          button.classList.add('correct');
        }
      });
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = '';
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = 'Quiz Completed!!';
    nextEl.remove();
  } else {
    showQuestion();
  }
}

// Shuffling the Options
function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

