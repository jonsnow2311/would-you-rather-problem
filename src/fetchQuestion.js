// dont change this file
const questions = [
  {
    id: 1,
    question: "Would you rather fly or be invisible?",
    options: [
      { label: "Fly", image: "https://placehold.co/100x100?text=Fly" },
      {
        label: "Invisible",
        image: "https://placehold.co/100x100?text=Invisible",
      },
    ],
  },
  {
    id: 2,
    question: "Would you rather have super strength or super speed?",
    options: [
      {
        label: "Strength",
        image: "https://placehold.co/100x100?text=Strength",
      },
      { label: "Speed", image: "https://placehold.co/100x100?text=Speed" },
    ],
  },
  {
    id: 3,
    question: "Would you rather live on the moon or underwater?",
    options: [
      { label: "Moon", image: "https://placehold.co/100x100?text=Moon" },
      {
        label: "Underwater",
        image: "https://placehold.co/100x100?text=Underwater",
      },
    ],
  },
  {
    id: 4,
    question: "Would you rather time travel to the past or future?",
    options: [
      { label: "Past", image: "https://placehold.co/100x100?text=Past" },
      { label: "Future", image: "https://placehold.co/100x100?text=Future" },
    ],
  },
  {
    id: 5,
    question: "Would you rather be a genius or be rich?",
    options: [
      { label: "Genius", image: "https://placehold.co/100x100?text=Genius" },
      { label: "Rich", image: "https://placehold.co/100x100?text=Rich" },
    ],
  },
];

export const fetchQuestion = (index) =>
  new Promise((resolve) => setTimeout(() => resolve(questions[index]), 500));
