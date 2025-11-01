import frTranslations from '../locales/fr.json';
import esTranslations from '../locales/es.json';

export const getQuestions = (locale: 'fr' | 'es' = 'fr') => {
  const translations = locale === 'fr' ? frTranslations : esTranslations;
  
  return [
    {
      question: translations.questions[0].question,
      answerOptions: [
        { answer: translations.questions[0].answers[0] },
        { answer: translations.questions[0].answers[1], isCorrect: true },
        { answer: translations.questions[0].answers[2] },
        { answer: translations.questions[0].answers[3] },
      ],
    },
    {
      question: translations.questions[1].question,
      answerOptions: [
        { answer: translations.questions[1].answers[0] },
        { answer: translations.questions[1].answers[1] },
        { answer: translations.questions[1].answers[2] },
        { answer: translations.questions[1].answers[3], isCorrect: true },
      ],
    },
    {
      question: translations.questions[2].question,
      answerOptions: [
        { answer: translations.questions[2].answers[0], isCorrect: true },
        { answer: translations.questions[2].answers[1] },
        { answer: translations.questions[2].answers[2] },
        { answer: translations.questions[2].answers[3] },
      ],
    },
    {
      question: translations.questions[3].question,
      answerOptions: [
        { answer: translations.questions[3].answers[0], isCorrect: true },
        { answer: translations.questions[3].answers[1] }
      ],
    },
    {
      question: translations.questions[4].question,
      answerOptions: [
        { answer: translations.questions[4].answers[0] },
        { answer: translations.questions[4].answers[1] },
        { answer: translations.questions[4].answers[2] },
        { answer: translations.questions[4].answers[3], isCorrect: true },
      ],
    },
    {
      question: translations.questions[5].question,
      answerOptions: [
        { answer: translations.questions[5].answers[0] },
        { answer: translations.questions[5].answers[1], isCorrect: true },
      ],
    },
    {
      question: translations.questions[6].question,
      answerOptions: [
        { answer: translations.questions[6].answers[0], isCorrect: true },
        { answer: translations.questions[6].answers[1] }
      ],
    },
    {
      question: translations.questions[7].question,
      answerOptions: [
        { answer: translations.questions[7].answers[0], isCorrect: true },
        { answer: translations.questions[7].answers[1] }
      ],
    },
    {
      question: translations.questions[8].question,
      answerOptions: [
        { answer: translations.questions[8].answers[0] },
        { answer: translations.questions[8].answers[1] },
        { answer: translations.questions[8].answers[2] },
        { answer: translations.questions[8].answers[3], isCorrect: true },
      ],
    },
    {
      question: translations.questions[9].question,
      answerOptions: [
        { answer: translations.questions[9].answers[0] },
        { answer: translations.questions[9].answers[1], isCorrect: true },
        { answer: translations.questions[9].answers[2] },
        { answer: translations.questions[9].answers[3] },
      ],
    },
  ];
};

export default getQuestions;