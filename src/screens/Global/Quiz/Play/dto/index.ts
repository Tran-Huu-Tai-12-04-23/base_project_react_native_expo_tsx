export interface ActivityType {
  name: string;
  date: string;
  price: string;
  cardId: number;
}

export interface QuizDTO {
  question: string;
  lstAnswers: string[];
  correctAnswerIndex: number;
}

const data: QuizDTO[] = [
  {
    question: "What is the synonym of 'happy'?",
    lstAnswers: ["Sad", "Joyful", "Angry", "Bored"],
    correctAnswerIndex: 1,
  },
  {
    question: "Which word is an antonym of 'difficult'?",
    lstAnswers: ["Easy", "Hard", "Complex", "Challenging"],
    correctAnswerIndex: 0,
  },
  {
    question: "What is the past tense of 'go'?",
    lstAnswers: ["Went", "Gone", "Going", "Goed"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which of the following is a compound word?",
    lstAnswers: ["Notebook", "Write", "Pen", "Paper"],
    correctAnswerIndex: 0,
  },
  {
    question: "What part of speech is 'quickly'?",
    lstAnswers: ["Noun", "Adjective", "Adverb", "Verb"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which sentence is correct?",
    lstAnswers: [
      "He go to the store.",
      "He goes to the store.",
      "He gone to the store.",
      "He going to the store.",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "What does the word 'bilingual' mean?",
    lstAnswers: [
      "Speaking two languages",
      "Speaking multiple languages",
      "Being unable to speak",
      "Learning a language",
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "Which of the following is a simile?",
    lstAnswers: [
      "He is a lion.",
      "He runs like the wind.",
      "He is a fast runner.",
      "He is strong.",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the main idea of a text?",
    lstAnswers: [
      "The title",
      "The central point",
      "The conclusion",
      "The first paragraph",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "Which word is a noun?",
    lstAnswers: ["Run", "Quick", "Happiness", "Swiftly"],
    correctAnswerIndex: 2,
  },
];

export { data };
